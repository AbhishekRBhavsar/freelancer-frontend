import { useState, useEffect, useRef } from "react";
import { SendOutlined, EmojiEmotionsOutlined } from "@mui/icons-material";
import { IconButton, InputBase, Paper } from "@mui/material";
import Picker from "emoji-picker-react";

export default function ChatForm(props) {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [showEmojiPicker]);

  const handleEmojiClick = (emojiObject, event) => {
    let newMessage = message + emojiObject.emoji;
    setMessage(newMessage);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    props.handleFormSubmit(message);
    setMessage("");
  };

  return (
    <div ref={scrollRef}>
      {showEmojiPicker && (
        <Picker
          sx={{ backgroundColor: "grey" }}
          onEmojiClick={handleEmojiClick}
        />
      )}
      <Paper
        component="form"
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          border: "1px solid grey.200",
          backgroundColor: "white",
          borderBottomLeftRadius: "16px",
          borderBottomRightRadius: "16px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
          "&:focus-within": {
            boxShadow: "none",
            border: "1px solid blue.500",
          },
        }}
        onSubmit={handleFormSubmit}
      >
        <IconButton
          onClick={(e) => {
            e.preventDefault();
            setShowEmojiPicker(!showEmojiPicker);
          }}
          sx={{ mr: 1 }}
        >
          <EmojiEmotionsOutlined
            sx={{ color: "blue.600" }}
            aria-hidden="true"
          />
        </IconButton>
        <InputBase
          placeholder="Write a message"
          sx={{
            ml: 3,
            flex: 1,
            fontSize: "14px",
            fontWeight: "400",
            color: "text.primary",
            backgroundColor: "grey.50",
            border: "1px solid grey.300",
            borderRadius: "16px",
            px: 2,
            py: 1.5,
            outline: "none",
            transition: "all 0.25s",
            "&:hover": {
              borderColor: "grey.500",
            },
            "&:focus": {
              borderColor: "blue.500",
              boxShadow: (theme) =>
                `0 0 0 1px ${theme.palette.primary.main}`,
            },
            "::placeholder": {
              color: "grey.400",
            },
            "&.Mui-focused": {
              backgroundColor: "grey.50",
            },
          }}
          name="message"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <IconButton type="submit">
          <SendOutlined
            sx={{
              color: "blue",
              transform: "rotate(-90deg)",
            }}
            aria-hidden="true"
          />
        </IconButton>
      </Paper>
    </div>
  );
}
