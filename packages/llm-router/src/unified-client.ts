import { LLMProvider, ChatRequest, ChatResponse } from "./types";

export interface UnifiedClientConfig {
  providers: LLMProvider[];
}

export class UnifiedClient {
  private providers: Map<string, LLMProvider> = new Map();

  constructor(config: UnifiedClientConfig) {
    for (const provider of config.providers) {
      this.providers.set(provider.id, provider);
    }
  }

  getProvider(id: string): LLMProvider | undefined {
    return this.providers.get(id);
  }

  getAllProviders(): LLMProvider[] {
    return Array.from(this.providers.values());
  }

  async chat(request: ChatRequest, providerId?: string): Promise<ChatResponse> {
    if (providerId) {
      const provider = this.providers.get(providerId);
      if (!provider) {
        throw new Error(`Provider with id "${providerId}" not found.`);
      }
      return provider.chat(request);
    }

    // Default: Pick the first provider that supports the requested model
    for (const provider of this.providers.values()) {
      if (provider.models.includes(request.model)) {
        try {
          return await provider.chat(request);
        } catch (error) {
          console.error(`Provider "${provider.name}" failed:`, error);
          // Continue to next provider
        }
      }
    }

    throw new Error(`No provider found that supports model "${request.model}" or all providers failed.`);
  }
}
