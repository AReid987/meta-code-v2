import { ChatRequest, ChatResponse, LLMProvider } from "./types";
import { UnifiedClient } from "./unified-client";
import { QuotaTracker } from "./quota-tracker";
import { ComplexityClassifier, ComplexityLevel } from "./complexity";

export interface RoutingEngineConfig {
  client: UnifiedClient;
  quotaTracker: QuotaTracker;
  complexityClassifier: ComplexityClassifier;
  modelMapping: Record<ComplexityLevel, string[]>;
}

export class RoutingEngine {
  private client: UnifiedClient;
  private quotaTracker: QuotaTracker;
  private complexityClassifier: ComplexityClassifier;
  private modelMapping: Record<ComplexityLevel, string[]>;

  constructor(config: RoutingEngineConfig) {
    this.client = config.client;
    this.quotaTracker = config.quotaTracker;
    this.complexityClassifier = config.complexityClassifier;
    this.modelMapping = config.modelMapping;
  }

  async chat(request: Omit<ChatRequest, "model"> & { model?: string }): Promise<ChatResponse> {
    // 1. Classify complexity if model is not specified
    let complexity = ComplexityLevel.Low;
    if (!request.model) {
      complexity = await this.complexityClassifier.classify(request as ChatRequest);
    }

    // 2. Determine target models
    const targetModels = request.model ? [request.model] : this.modelMapping[complexity];

    // 3. Find available provider/model combo
    for (const model of targetModels) {
      for (const provider of this.client.getAllProviders()) {
        if (provider.models.includes(model)) {
          const isAvailable = await this.quotaTracker.isAvailable(provider.id, model);
          if (isAvailable) {
            try {
              const response = await provider.chat({ ...request, model } as ChatRequest);
              
              // 4. Update quota after successful response
              await this.quotaTracker.trackUsage(provider.id, model, {
                prompt_tokens: response.usage.prompt_tokens,
                completion_tokens: response.usage.completion_tokens,
              });

              return response;
            } catch (error) {
              console.error(`RoutingEngine: Provider "${provider.name}" failed for model "${model}":`, error);
              // Continue to next provider/model
            }
          }
        }
      }
    }

    throw new Error(`RoutingEngine: No available provider/model found for request.`);
  }
}
