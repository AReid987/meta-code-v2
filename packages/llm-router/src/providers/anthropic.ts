import { LLMProvider, ChatRequest, ChatResponse, ProviderUsage, Message } from "../types";

export interface AnthropicProviderConfig {
  apiKey: string;
  baseUrl?: string;
}

export class AnthropicProvider implements LLMProvider {
  id = "anthropic";
  name = "Anthropic";
  models = ["claude-3-5-sonnet-20240620", "claude-3-opus-20240229", "claude-3-haiku-20240307"];
  private apiKey: string;
  private baseUrl: string;

  constructor(config: AnthropicProviderConfig) {
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl || "https://api.anthropic.com/v1";
  }

  async chat(request: ChatRequest): Promise<ChatResponse> {
    const systemMessage = request.messages.find(m => m.role === "system");
    const otherMessages = request.messages.filter(m => m.role !== "system");

    const body = {
      model: request.model,
      messages: otherMessages.map(m => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.content,
      })),
      system: systemMessage?.content,
      max_tokens: request.max_tokens || 4096,
      temperature: request.temperature,
      stream: request.stream,
    };

    const response = await fetch(`${this.baseUrl}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": this.apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Anthropic API error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return {
      id: data.id,
      model: data.model,
      choices: [
        {
          message: {
            role: "assistant",
            content: data.content[0].text,
          },
          finish_reason: data.stop_reason,
        },
      ],
      usage: {
        prompt_tokens: data.usage.input_tokens,
        completion_tokens: data.usage.output_tokens,
        total_tokens: data.usage.input_tokens + data.usage.output_tokens,
      },
    };
  }

  async getUsage(): Promise<ProviderUsage> {
    // Anthropic provides rate limit info in headers, we'd need to extract them.
    // For now, placeholder.
    return {
      requestsRemaining: 50,
      tokensRemaining: 40000,
      resetAt: new Date(Date.now() + 60000),
    };
  }
}
