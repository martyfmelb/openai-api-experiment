import styles from "./ChatOutput.module.scss";
import { CHAT_SPEAKER_THEM, CHAT_SPEAKER_US, ChatItem, ChatItems } from "@/types/ChatItems";
import clsx from "clsx";

const multilinify = (text: string) => {
  const lines = text.split("\n");
  return lines.map((line, index) => (
    <>
      {index > 0 && <br />}
      {line}
    </>
  ));
};

type ChatOutputProps = {
  chatItems: ChatItems;
};

export const ChatOutput: React.FC<ChatOutputProps> = (props) => (
  <div className={styles.bubbles}>
    {props.chatItems.map((chatItem: ChatItem) => (
      <p
        key={chatItem.id}
        className={clsx(styles.bubble, {
          [styles.them]: chatItem.speaker === CHAT_SPEAKER_THEM,
          [styles.us]: chatItem.speaker === CHAT_SPEAKER_US,
        })}
      >
        {multilinify(chatItem.content)}
      </p>
    ))}
  </div>
);
