export type OpenAiMessage = {
  role: "user" | "system" | "assistant",
  content: string
};

export type OpenAiMessages = OpenAiMessage[];
