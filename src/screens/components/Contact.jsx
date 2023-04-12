import { useState, useEffect } from "react";

import { getUser } from "../../services/ChatService";
import { Avatar, ListItemAvatar, ListItemText } from "@mui/material";
import UserLayout from "./UserLayout";

export default function Contact({ chatRoom, onlineUsersId, currentUser, list }) {
  const [contact, setContact] = useState();

  useEffect(() => {

    const contactId = chatRoom.members?.find(
      (member) => member !== currentUser._id
    );

    const fetchData = async () => {
      const res = await getUser(contactId);
      const user = res.data.user;
      setContact(user);
    };

    fetchData();
  }, [chatRoom, currentUser]);

  if (list) {
    return (
      <>
        <ListItemAvatar>
          <Avatar src={contact?.picture}>
            <UserLayout user={contact} onlineUsersId={onlineUsersId} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={`${contact?.firstName} ${contact?.lastName}`} />
      </>
    )
  }
  return (
    <Avatar src={contact?.picture}>
      <UserLayout user={contact} onlineUsersId={onlineUsersId} />
    </Avatar>
  )
}