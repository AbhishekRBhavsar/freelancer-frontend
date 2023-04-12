import { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
} from "@mui/material";
import { createChatRoom, getChatRoomById } from "../../services/ChatService";
import Contact from "./Contact";
import UserLayout from "./UserLayout";

export default function AllUsers({
  users,
  chatRooms,
  setChatRooms,
  onlineUsersId,
  currentUser,
  changeChat,
}) {
  const [selectedChat, setSelectedChat] = useState();
  const [nonContacts, setNonContacts] = useState([]);
  const [contactIds, setContactIds] = useState([]);
  const [chatroomTitle, setChatroomTitle] = useState({});

  useEffect(() => {
    const Ids = chatRooms.map((chatRoom) => {
      return chatRoom.members.find((member) => member !== currentUser._id);
    });
    setContactIds(Ids);
  }, [chatRooms, currentUser._id]);

  useEffect(() => {
    setNonContacts(
      users.filter(
        (f) => f._id !== currentUser._id && !contactIds.includes(f._id)
      )
    );
  }, [contactIds, users, currentUser._id]);

  // useEffect(() => {
  //   const chatRoom = chatRooms.find((chatRoom) => chatRoom._id === roomId);
  //   if (chatRoom) {
  //     const index = chatRooms.indexOf(chatRoom);
  //     setSelectedChat(index);
  //     changeChat(chatRoom);
  //   } else {
  //     const fetchData = async () => {
  //       const res = await getChatRoomById(roomId);
  //       setChatRooms((prev) => [...prev, res]);
  //       changeChat(res);
  //     };
  //     fetchData();
  //   }
  // }, [roomId]);

  const changeCurrentChat = (index, chat) => {
    setSelectedChat(index);
    changeChat(chat);
  };

  const handleNewChatRoom = async (user) => {
    const members = {
      senderId: currentUser._id,
      receiverId: user._id,
    };
    const res = await createChatRoom(members);
    setChatRooms((prev) => [...prev, res]);
    changeChat(res);
  };

  return (
    <>
      <Typography variant="h6" color="textPrimary" gutterBottom>
        Chats
      </Typography>
      <List>
        {chatRooms.map((chatRoom, index) => (
          <ListItem
            key={index}
            button
            selected={index === selectedChat}
            onClick={() => changeCurrentChat(index, chatRoom)}
          >
            <Contact
              chatRoom={chatRoom}
              onlineUsersId={onlineUsersId}
              currentUser={currentUser}
              list={true}
            >
            </Contact>
          </ListItem>
        ))}
      </List>
      <Typography variant="h6" color="textPrimary" gutterBottom>
        Other Users
      </Typography>
      <List>
        {nonContacts.map((nonContact, index) => (
          <ListItem
            key={index}
            button
            onClick={() => handleNewChatRoom(nonContact)}
          >
            <ListItemAvatar>
              <Avatar src={nonContact?.picture}> 
                <UserLayout user={nonContact} onlineUsersId={onlineUsersId} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={`${nonContact.firstName} ${nonContact.lastName}`} />
          </ListItem>
        ))}
      </List>
    </>
  );
}
