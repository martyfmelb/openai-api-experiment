"use client";

export const CHAT_SPEAKER_THEM = "them";
export const CHAT_SPEAKER_US = "us";

export type ChatSpeaker = typeof CHAT_SPEAKER_THEM | typeof CHAT_SPEAKER_US;

export type ChatItem = {
  id: string;
  speaker: ChatSpeaker;
  content: string;
};

export type ChatItems = ChatItem[];
