import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import styles from "./ChatInput.module.scss";
import { useCallback, useRef } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";

type ChatInputProps = {
  initialValue: string;
  onSend: (text: string) => void;
};

export const ChatInput: React.FC<ChatInputProps> = (props) => {
  const textFieldRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useLocalStorage("chatInputValue", props.initialValue);

  const handleSend = useCallback(
    (text: string) => {
      setText("");
      props.onSend(text);
      textFieldRef.current?.focus();
    },
    [props, setText]
  );

  const handleSendClick = useCallback(
    (e: React.MouseEvent<HTMLTextAreaElement | HTMLButtonElement>) => {
      handleSend(textFieldRef.current?.value || "");
      e.preventDefault();
    },
    [handleSend]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.ctrlKey && e.key === "Enter") {
        handleSend(textFieldRef.current?.value || "");
      }
    },
    [handleSend]
  );

  return (
    <div className={styles.main}>
      <form>
        <TextField
          inputRef={textFieldRef}
          fullWidth
          multiline
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        <Button variant="contained" onClick={(e) => handleSendClick(e)} type="submit">
          Send
        </Button>
      </form>
    </div>
  );
};
