import { LLMProvider, ChatRequest, ChatResponse, ProviderUsage } from "../types";

export interface GoogleProviderConfig {
  apiKey: string;
  baseUrl?: string;
}

export class GoogleProvider implements LLMProvider {
  id = "google";
  name = "Google Generative AI";
  models = ["gemini-1.5-pro-latest", "gemini-1.5-flash-latest", "gemini-pro"];
  private apiKey: string;
  private baseUrl: string;

  constructor(config: GoogleProviderConfig) {
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl || "https://generativelanguage.googleapis.com/v1beta";
  }

  async chat(request: ChatRequest): Promise<ChatResponse> {
    const systemMessage = request.messages.find(m => m.role === "system");
    const otherMessages = request.messages.filter(m => m.role !== "system");

    const body: any = {
      contents: otherMessages.map(m => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
      generationConfig: {
        maxOutputTokens: request.max_tokens,
        temperature: request.temperature,
      },
    };

    if (systemMessage) {
      body.systemInstruction = {
        parts: [{ text: systemMessage.content }],
      };
    }

    const response = await fetch(`${this.baseUrl}/models/${request.model}:generateContent?key=${this.apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Google API error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const candidate = data.candidates[0];
    return {
      id: "google-" + Date.now(), // Google doesn't return a top-level ID in the same way
      model: request.model,
      choices: [
        {
          message: {
            role: "assistant",
            content: candidate.content.parts[0].text,
          },
          finish_reason: candidate.finishReason,
        },
      ],
      usage: {
        prompt_tokens: data.usageMetadata?.promptTokenCount || 0,
        completion_tokens: data.usageMetadata?.candidatesTokenCount || 0,
        total_tokens: data.usageMetadata?.totalTokenCount || 0,
      },
    };
  }

  async getUsage(): Promise<ProviderUsage> {
    // Google's quota is model-specific, and we'd need to fetch it from the API if possible.
    // Placeholder.
    return {
      requestsRemaining: 60,
      tokensRemaining: 1000000,
      resetAt: new Date(Date.now() + 60000),
    };
  }
}
