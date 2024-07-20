"use client";
import React from "react";
import { Box, IconButton, TextareaAutosize } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

interface MessageField {
  onSendMessage: (message: string) => void;
}

const UserMessageField: React.FC<MessageField> = ({ onSendMessage }) => {
  const [message, setMessage] = React.useState("");
  return (
    <Box className="max-w-[1000px] w-full text-sm font-normal font-sans leading-normal p-3 rounded-md shadow-lg shadow-slate-100 border border-solid border-slate-300 bg-white text-slate-900 flex justify-center items-center">
      <TextareaAutosize
        maxRows={5}
        className="w-full resize-none border-none focus:outline-none"
        aria-label="empty textarea"
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <IconButton
        aria-label="send message"
        size="small"
        onClick={() => onSendMessage(message)}
      >
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default UserMessageField;
