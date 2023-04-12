import { useState, useEffect, useRef } from "react";
import { Box, Paper, ListItemText, List } from "@mui/material";
import { getMessagesOfChatRoom, sendMessage } from "../../services/ChatService";

import Message from "./Message";
import Contact from "./Contact";
import ChatForm from "./ChatForm";

export default function ChatRoom({ currentChat, currentUser, socket }) {
  const [messages, setMessages] = useState([]);
  const [incomingMessage, setIncomingMessage] = useState(null);

  const scrollRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getMessagesOfChatRoom(currentChat._id);
      setMessages(res.data);
    };
    fetchData();
  }, [currentChat._id]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    socket.current?.on("getMessage", (data) => {
      setIncomingMessage({
        senderId: data.senderId,
        message: data.message,
      });
    });
  }, [socket]);

  useEffect(() => {
    incomingMessage && setMessages((prev) => [...prev, incomingMessage]);
  }, [incomingMessage]);

  const handleFormSubmit = async (message) => {
    const receiverId = currentChat.members.find(
      (member) => member !== currentUser._id
    );

    socket.current.emit("sendMessage", {
      senderId: currentUser._id,
      receiverId: receiverId,
      message: message,
    });

    const messageBody = {
      chatRoomId: currentChat._id,
      sender: currentUser._id,
      message: message,
    };
    const res = await sendMessage(messageBody);
    setMessages([...messages, res.data]);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between" }}>
      <Box sx={{ flexGrow: 1, height: '100%', backgroundColor: '#f9fafb' }}>
        <Paper sx={{ p: 3, borderBottom: "1px solid #ddd" }}>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Contact chatRoom={currentChat} currentUser={currentUser} list={true} />
            {/* <ListItemText primary={`${currentUser.firstName} ${currentUser.lastName}`} /> */}
          </Box>
        </Paper>

        <Box
          sx={{
            flexGrow: 1,
            p: 6,
            overflowY: "auto",
            backgroundColor: "#f9fafb",
            height: "auto",
            // border: "1px solid #ddd",
          }}
        >
          <List sx={{ listStyleType: "none", m: 0, p: 0 }}>
            {messages.map((message, index) => (
              <div key={index} ref={scrollRef}>
                <Message message={message} self={currentUser._id} />
              </div>
            ))}
            <Box ref={scrollRef} />
          </List>
        </Box>
      </Box>
      <Box>
        <ChatForm handleFormSubmit={handleFormSubmit} />
      </Box>
    </Box>
  );
}
