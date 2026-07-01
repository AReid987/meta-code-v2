import { ChatRequest } from "./types";

export enum ComplexityLevel {
  Low = "low",
  Medium = "medium",
  High = "high",
}

export interface ComplexityClassifier {
  classify(request: ChatRequest): Promise<ComplexityLevel>;
}

export class SimpleComplexityClassifier implements ComplexityClassifier {
  async classify(request: ChatRequest): Promise<ComplexityLevel> {
    const totalContentLength = request.messages.reduce(
      (acc, msg) => acc + msg.content.length,
      0
    );

    const messageCount = request.messages.length;

    if (totalContentLength > 5000 || messageCount > 10) {
      return ComplexityLevel.High;
    }

    if (totalContentLength > 1000 || messageCount > 5) {
      return ComplexityLevel.Medium;
    }

    return ComplexityLevel.Low;
  }
}
