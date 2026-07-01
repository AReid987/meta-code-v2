import { LLMProvider, ChatRequest, ChatResponse, ProviderUsage } from "../types";

export interface OpenAIProviderConfig {
  apiKey: string;
  baseUrl?: string;
  organizationId?: string;
}

export class OpenAIProvider implements LLMProvider {
  id = "openai";
  name = "OpenAI";
  models = ["gpt-4o", "gpt-4-turbo", "gpt-3.5-turbo"];
  private apiKey: string;
  private baseUrl: string;

  constructor(config: OpenAIProviderConfig) {
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl || "https://api.openai.com/v1";
  }

  async chat(request: ChatRequest): Promise<ChatResponse> {
    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenAI API error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return {
      id: data.id,
      model: data.model,
      choices: data.choices.map((choice: any) => ({
        message: {
          role: choice.message.role,
          content: choice.message.content,
        },
        finish_reason: choice.finish_reason,
      })),
      usage: {
        prompt_tokens: data.usage.prompt_tokens,
        completion_tokens: data.usage.completion_tokens,
        total_tokens: data.usage.total_tokens,
      },
    };
  }

  async getUsage(): Promise<ProviderUsage> {
    // OpenAI doesn't provide real-time quota in standard headers yet, 
    // we would need to integrate with their Usage API or track locally.
    // For now, return a placeholder.
    return {
      requestsRemaining: 100,
      tokensRemaining: 100000,
      resetAt: new Date(Date.now() + 60000),
    };
  }
}
