"use client";

export const CHAT_ROLE_SYSTEM = "system";
export const CHAT_ROLE_ASSISTANT = "assistant";
export const CHAT_ROLE_USER = "user";

export type ChatSpeaker = typeof CHAT_ROLE_SYSTEM | typeof CHAT_ROLE_ASSISTANT | typeof CHAT_ROLE_USER;

export type ChatItem = {
  id: string;
  role: ChatSpeaker;
  content: string;
};

export type ChatItems = ChatItem[];
