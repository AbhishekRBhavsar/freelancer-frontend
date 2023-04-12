import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Checkbox, FormControl, FormControlLabel, FormLabel, Slider, TextField, InputLabel, MenuItem, Select, Radio,
  RadioGroup, Button, Paper, Typography, Container, FormHelperText, Box, Input, Grid, List, ListItem, ListItemText, Link, ListItemButton, Stack, Avatar, Alert, IconButton,
} from "@mui/material";
import {
  Navbar
} from "./components";
import {
  getAllUsers,
  getChatRooms,
  initiateSocketConnection,
  getChatRoomById,
} from "../services/ChatService";
// import { useAuth } from "../../contexts/AuthContext";
import { useSelector } from 'react-redux';

import ChatRoom from "./components/ChatRoom";
import Welcome from "./components/Welcome";
import AllUsers from "./components/AllUsers";
import SearchUsers from "./components/SearchUsers";

export default function Chat() {
  const { search } = useParams();

  const [users, SetUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [chatRooms, setChatRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);

  const [currentChat, setCurrentChat] = useState();
  const [onlineUsersId, setonlineUsersId] = useState([]);
  const [searchQuery, setSearchQuery] = useState( search || "");

  
  const [isContact, setIsContact] = useState(false);
  
  const socket = useRef();
  
  // const { currentUser } = useAuth();
  
  const { userInfo: currentUser } = useSelector(
    (state) => state.auth
    )
  // const currentUser = {}; 
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await getChatRoomById(roomId);
  //     setCurrentChat(res);
  //   };

  //   fetchData();
  // }, [roomId]);

  useEffect(() => {
    const getSocket = async () => {
      const res = await initiateSocketConnection();
      socket.current = res;
      socket.current.emit("addUser", currentUser._id);
      socket.current.on("getUsers", (users) => {
        const userId = users.map((u) => u[0]);
        setonlineUsersId(userId);
      });
    };

    getSocket();
  }, [currentUser._id]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getChatRooms(currentUser._id);
      const result = res.data;
      setChatRooms(result);
    };

    fetchData();
  }, [currentUser._id]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllUsers();
      SetUsers(res.data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredUsers(users);
    setFilteredRooms(chatRooms);
  }, [users, chatRooms]);

  useEffect(() => {
    if (isContact) {
      setFilteredUsers([]);
    } else {
      setFilteredRooms([]);
    }
  }, [isContact]);


  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  const handleSearch = (newSearchQuery) => {
    setSearchQuery(newSearchQuery);

    const searchedUsers = users.filter((user) => {
      return user.firstName
        .toLowerCase()
        .includes(newSearchQuery.toLowerCase());
    });

    const searchedUsersId = searchedUsers.map((u) => u._id);

    // If there are initial contacts
    if (chatRooms.length !== 0) {
      chatRooms.forEach((chatRoom) => {
        // Check if searched user is a contact or not.
        const isUserContact = chatRoom.members.some(
          (e) => e !== currentUser._id && searchedUsersId.includes(e)
        );
        setIsContact(isUserContact);

        isUserContact
          ? setFilteredRooms([chatRoom])
          : setFilteredUsers(searchedUsers);
      });
    } else {
      setFilteredUsers(searchedUsers);
    }
  };

  return (
    <>
      <Navbar />
      <Container fixed>
          <Paper style={{ borderRadius: '16px 40px' }}>
            <Box style={{ display: 'flex', justifyContent: 'space-between', padding: '0.7rem', marginTop: '0.5rem', borderLeft: "1rem solid #0288d1", borderRight: "1rem solid #0288d1", borderRadius: '16px 40px' }}>
              <Typography variant="h5" sx={{ fontFamily: 'Georgia, serif', margin: '0.2rem', marginLeft: '1rem' }} gutterBottom>
                Chat 
              </Typography>
            </Box>
          </Paper>
        <Grid container spacing={2} sx={{ border: '1rem solid #0288d1', padding: '0.5rem', width: 'auto', margin: '1rem', display: 'flex', flexDirection: 'row', }}>
          <Grid item xs={3} my={1} mt={1} sx={{ backgroundColor: '#ffffff', border: '1px solid black' }}>
                  <SearchUsers handleSearch={handleSearch} />
            <AllUsers
              users={searchQuery !== "" ? filteredUsers : users}
              chatRooms={searchQuery !== "" ? filteredRooms : chatRooms}
              setChatRooms={setChatRooms}
              onlineUsersId={onlineUsersId}
              currentUser={currentUser}
              changeChat={handleChatChange}
            />
          </Grid>
          <Grid item xs={9} my={1} p={1}>
            <Grid item xs={12} p={1} sx={{ border: 'solid black', backgroundColor: '#ffffff', height: '100%' }}>
              {currentChat ? (
                <ChatRoom
                currentChat={currentChat}
                currentUser={currentUser}
                socket={socket}
                />
                ) : (
                  <>
                  <Welcome />
                </>
              )}
            </Grid>
          </Grid>
        </Grid>

      </Container>
    </>
  )
}