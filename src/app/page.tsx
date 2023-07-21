"use client";

import { ChatInput } from "@/components/ChatInput/ChatInput";
import styles from "./page.module.css";
import useLocalStorage from "@/hooks/useLocalStorage";
import { CHAT_ROLE_ASSISTANT, CHAT_ROLE_USER, ChatItem, ChatItems } from "../types/ChatItems";
import { ChatOutput } from "@/components/ChatOutput/ChatOutput";
import { Button } from "@mui/material";
import { chatItemsToOpenAiMessages } from "@/mappers/chatItemsToOpenAiMessages";
import axios from "axios";
import { OpenAiChatCompletionsResponse } from "@/types/OpenAiChatCompletionsResponse";

export default function Home() {
  const [chatItems, setChatItems] = useLocalStorage<ChatItems>("chatItems", []);

  const addUserChatItem = (chatItemContent: string) => {
    const chatItem: ChatItem = { id: new Date().toISOString(), content: chatItemContent, role: CHAT_ROLE_USER };
    const newChatItems: ChatItems = chatItems.concat([chatItem]);
    setChatItems(newChatItems);
    axios
      .post<{ data: OpenAiChatCompletionsResponse }>("/api/chat", {
        messages: chatItemsToOpenAiMessages(newChatItems),
      })
      .then((res) => {
        addAssistantChatItem(res.data.data.choices[0].message.content);
      });
  };

  const addAssistantChatItem = (chatItemContent: string) => {
    const chatItem: ChatItem = { id: new Date().toISOString(), content: chatItemContent, role: CHAT_ROLE_ASSISTANT };
    setChatItems((chatItems) => chatItems.concat([chatItem]));
  };

  return (
    <div className={styles.main}>
      <Button
        variant="outlined"
        onClick={() => {
          setChatItems([]);
        }}
      >
        Clear
      </Button>
      <div className={styles.logPane}>
        <ChatOutput chatItems={chatItems} />
      </div>
      <div className={styles.chatInputPane}>
        <ChatInput initialValue="" onSend={(text) => addUserChatItem(text)} />
      </div>
    </div>
  );
}
