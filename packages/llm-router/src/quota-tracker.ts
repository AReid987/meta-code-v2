import { ProviderUsage } from "./types";

export interface QuotaTracker {
  trackUsage(providerId: string, model: string, usage: { prompt_tokens: number; completion_tokens: number }): Promise<void>;
  getProviderUsage(providerId: string): Promise<ProviderUsage>;
  isAvailable(providerId: string, model: string): Promise<boolean>;
  updateQuota(providerId: string, usage: ProviderUsage): Promise<void>;
}

export class InMemoryQuotaTracker implements QuotaTracker {
  private usage: Map<string, ProviderUsage> = new Map();

  // Current available providers based on actual inventory
  private static readonly AVAILABLE_PROVIDERS = [
    "mistral", "groq", "cerebras", "openrouter", "voidai", 
    "gemini-pro", "kimi", "z-ai", "gemini-cli", "qwen-cli", "kiro-cli"
  ];

  async trackUsage(providerId: string, _model: string, usage: { prompt_tokens: number; completion_tokens: number }): Promise<void> {
    const current = this.usage.get(providerId);
    if (!current) return;

    this.usage.set(providerId, {
      ...current,
      requestsRemaining: Math.max(0, current.requestsRemaining - 1),
      tokensRemaining: Math.max(0, current.tokensRemaining - (usage.prompt_tokens + usage.completion_tokens)),
    });
  }

  async getProviderUsage(providerId: string): Promise<ProviderUsage> {
    const current = this.usage.get(providerId);
    if (!current) {
      // Default to a safe limit for new/unknown providers if not explicitly set
      return {
        requestsRemaining: 0,
        tokensRemaining: 0,
        resetAt: new Date(),
      };
    }
    return current;
  }

  async isAvailable(providerId: string, _model: string): Promise<boolean> {
    if (!InMemoryQuotaTracker.AVAILABLE_PROVIDERS.includes(providerId)) {
      return false;
    }
    const usage = await this.getProviderUsage(providerId);
    return usage.requestsRemaining > 0 && usage.tokensRemaining > 0;
  }

  async updateQuota(providerId: string, usage: ProviderUsage): Promise<void> {
    this.usage.set(providerId, usage);
  }
}
