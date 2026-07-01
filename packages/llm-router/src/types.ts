import { z } from "zod";

export const MessageSchema = z.object({
  role: z.enum(["system", "user", "assistant"]),
  content: z.string(),
});

export type Message = z.infer<typeof MessageSchema>;

export const ChatRequestSchema = z.object({
  model: z.string(),
  messages: z.array(MessageSchema),
  temperature: z.number().optional().default(0.7),
  max_tokens: z.number().optional(),
  stream: z.boolean().optional().default(false),
});

export type ChatRequest = z.infer<typeof ChatRequestSchema>;

export const ChatResponseSchema = z.object({
  id: z.string(),
  model: z.string(),
  choices: z.array(
    z.object({
      message: MessageSchema,
      finish_reason: z.string(),
    })
  ),
  usage: z.object({
    prompt_tokens: z.number(),
    completion_tokens: z.number(),
    total_tokens: z.number(),
  }),
});

export type ChatResponse = z.infer<typeof ChatResponseSchema>;

export interface ProviderUsage {
  requestsRemaining: number;
  tokensRemaining: number;
  resetAt: Date;
}

export interface LLMProvider {
  id: string;
  name: string;
  models: string[];
  chat(request: ChatRequest): Promise<ChatResponse>;
  getUsage(): Promise<ProviderUsage>;
}
