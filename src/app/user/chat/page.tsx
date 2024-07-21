"use client";
import React, { useEffect, useState } from "react";
import UserMessageField from "./_components/UserMessageField";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { MuiMarkdown } from "mui-markdown";
import {
  Add,
  CreateNewFolderOutlined,
  ViewSidebarRounded,
} from "@mui/icons-material";
import { useDrawer } from "./_components/DrawerContext";
import { useChatContext } from "./_components/ChatContext";
import axios from "axios";
import { toast } from "react-toastify";

const chat = [
  {
    role: "assistant",
    content: "Hello, how can I help you today?",
  },
  {
    role: "user",
    content: "I'm looking for a new job",
  },
];

const Page: React.FC = () => {
  const { open, handleDrawerClose, handleDrawerOpen } = useDrawer();
  const { createChat, createChatOff, createChatOn, chatId, setChatId } =
    useChatContext();

  const [messages, setMessages] = useState(chat);

  useEffect(() => {
    if (chatId && !createChat)
      axios
        .get(`/api/user/chat/${chatId}`)
        .then((res) => {
          setMessages(res.data.messages);
        })
        .then((err) => {
          // console.log(err);
        });
  }, [chatId]);

  const handleMessage = async (userMessage: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: userMessage },
    ]);
    if (createChat && chatId.length > 0) {
      axios
        .post("/api/user/chat", {
          userId: "669b5238f53e5267a0f8f176",
          title: "Chat Title",
          initialQuery: userMessage,
        })
        .then((res) => {
          setMessages((prevMessages) => [
            ...prevMessages,
            { role: "assistant", content: res.data.response },
          ]);
        })
        .catch((err) => {
          console.log("Error Found");
        });
    } else {
      console.log("Not to Create New Chat");
      axios
        .post(`/api/user/chat/${chatId}`, {
          userQuery: userMessage,
        })
        .then((res) => {
          setMessages((prevMessages) => [
            ...prevMessages,
            { role: "assistant", content: res.data.response },
          ]);
        })
        .then((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Box className="flex w-full h-full flex-col">
      {/* Top Box */}
      <Box className="w-full py-5 px-4 flex gap-6">
        {!open ? (
          <Box className="flex gap-3">
            <IconButton size="small" onClick={() => handleDrawerOpen()}>
              <ViewSidebarRounded />
            </IconButton>
            <IconButton size="small">
              <CreateNewFolderOutlined
                onClick={() => {
                  createChatOn();
                  setChatId("");
                }}
              />
            </IconButton>
          </Box>
        ) : (
          <></>
        )}

        <Typography variant="h5" fontWeight={"bold"}>
          This Is Chat
        </Typography>
      </Box>

      {/* Center Box for Chat Messages */}
      <Box
        className="flex-grow overflow-y-auto p-4 flex items-center flex-col"
        sx={{
          padding: "10px 0px 10px 0px",
          position: "relative",
          width: "100%",
        }}
      >
        {createChat ? (
          <>
            <Box className=" w-full h-full flex justify-center items-center">
              <Typography
                className="px-20 bg-slate-50 py-10 border rounded-md"
                variant="h4"
                component="h5"
                fontWeight={"bold"}
              >
                Query...
              </Typography>
            </Box>
          </>
        ) : (
          messages.map((chatMessage, index) => (
            <Box
              key={index}
              className="mb-4 w-full border rounded-lg p-5 flex items-center gap-4 max-w-[1000px]"
            >
              {chatMessage.role === "user" ? (
                <Avatar
                  sx={{
                    width: "40px",
                    height: "40px",
                  }}
                />
              ) : (
                <Avatar
                  src="/bot_av.png"
                  className="border"
                  sx={{
                    width: "40px",
                    height: "40px",
                  }}
                />
              )}

              <Typography
                variant="body1"
                className={`${
                  chatMessage.role === "user" ? "text-right" : "text-left"
                } `}
              >
                <MuiMarkdown>{chatMessage.content}</MuiMarkdown>
              </Typography>
            </Box>
          ))
        )}
      </Box>

      {/* Bottom Box for User Message Input */}
      <Box
        className="w-full p-4 flex justify-center items-center border-t py-8"
        sx={{
          position: "relative",
          width: "100%",
        }}
      >
        <UserMessageField onSendMessage={handleMessage} />
      </Box>
    </Box>
  );
};

export default Page;
