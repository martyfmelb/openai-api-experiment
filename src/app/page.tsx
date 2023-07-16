"use client";

import { ChatInput } from "@/components/ChatInput/ChatInput";
import styles from "./page.module.css";
import useLocalStorage from "@/hooks/useLocalStorage";
import { CHAT_SPEAKER_US, ChatItem, ChatItems } from "../types/ChatItems";
import { ChatOutput } from "@/components/ChatOutput/ChatOutput";

export default function Home() {
  const [chatItems, setChatItems] = useLocalStorage<ChatItems>("chatItems", []);

  const addChatItem = (chatItemContent: string) => {
    const chatItem: ChatItem = { id: new Date().toISOString(), content: chatItemContent, speaker: CHAT_SPEAKER_US };
    setChatItems(chatItems.concat([chatItem]));
  };

  return (
    <div className={styles.main}>
      <div className={styles.logPane}>
        <ChatOutput chatItems={chatItems} />
      </div>
      <div className={styles.chatInputPane}>
        <ChatInput initialValue="" onSend={(text) => addChatItem(text)} />
      </div>
    </div>
  );
}
