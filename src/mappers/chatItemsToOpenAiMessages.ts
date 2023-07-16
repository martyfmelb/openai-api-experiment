import { CHAT_ROLE_ASSISTANT, CHAT_ROLE_SYSTEM, CHAT_ROLE_USER, ChatItem, ChatItems } from "@/types/ChatItems"
import { OpenAiMessages } from "@/types/OpenAiMessages";

export const chatItemsToOpenAiMessages = (chatItems: ChatItems): OpenAiMessages => {
  return chatItems.map((chatItem: ChatItem) => ({
    "role": (
      {
        [CHAT_ROLE_SYSTEM]: "system",
        [CHAT_ROLE_ASSISTANT]: "assistant",
        [CHAT_ROLE_USER]: "user"
      }[chatItem.role] || "user"
    ) as "system" | "assistant" | "user",
    "content": chatItem.content
  }));
};
