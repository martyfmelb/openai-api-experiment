import styles from "./ChatOutput.module.scss";
import { CHAT_ROLE_ASSISTANT, CHAT_ROLE_SYSTEM, CHAT_ROLE_USER, ChatItem, ChatItems } from "@/types/ChatItems";
import Typography from "@mui/material/Typography";
import clsx from "clsx";

const multilinify = (text: string) => {
  const lines = text.split("\n");
  return lines.map((line, index) => (
    <Typography key={index} variant="body2">
      {line}
    </Typography>
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
          [styles.system]: chatItem.role === CHAT_ROLE_SYSTEM,
          [styles.assistant]: chatItem.role === CHAT_ROLE_ASSISTANT,
          [styles.user]: chatItem.role === CHAT_ROLE_USER,
        })}
      >
        {multilinify(chatItem.content)}
      </p>
    ))}
  </div>
);
