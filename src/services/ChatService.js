import axios from "axios";
// // import auth from "../config/firebase";
import { io } from "socket.io-client";

const baseURL = process.env.REACT_APP_BACKEND_URL;

const getUserToken = async () => {
  // const user = auth.currentUser;
  // const token = user && (await user.getIdToken());
  let token = localStorage.getItem("userToken");
  return token;
};

export const initiateSocketConnection = async () => {
  const token = await getUserToken();

  const socket = io(process.env.REACT_APP_SOCKET_URL, {
    
  });

  return socket;
};

const createHeader = async () => {
  const token = await getUserToken();

  const payloadHeader = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  };
  return payloadHeader;
};

export const getAllUsers = async () => {
  const header = await createHeader();

  try {
    const res = await axios.get(`${baseURL}/users`, header);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const getAdminUsers = async ({search, page, limit}) => {
  const header = await createHeader();

  try {
    const res = await axios.get(`${baseURL}/admin/users?search=${search}&page=${page}&limit=${limit}`, header);
    return res.data;
  }
  catch (e) {
    console.error(e);
  }
}

export const getUsersActivity = async ({ search, page, limit }) => {
  const header = await createHeader();

  try {
    const res = await axios.get(`${baseURL}/admin/users/activity?search=${search}&page=${page}&limit=${limit}`, header);
    return res.data;
  }
  catch (e) {
    console.error(e);
  }
}

export const getUser = async (userId) => {
  const header = await createHeader();

  try {
    
    const res = await axios.get(`${baseURL}/user/${userId}`, header);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const getUsers = async (users) => {
  const header = await createHeader();

  try {
    const res = await axios.get(`${baseURL}/user/users`, users, header);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const getChatRooms = async (userId) => {
  const header = await createHeader();

  try {
    const res = await axios.get(`${baseURL}/chat/room/${userId}`, header);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const getChatRoomOfUsers = async (firstUserId, secondUserId) => {
  const header = await createHeader();

  try {
    const res = await axios.get(
      `${baseURL}/chat/room/${firstUserId}/${secondUserId}`,
      header
    );
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const getChatRoomById = async (chatRoomId) => {
  const header = await createHeader();

  try {
    const res = await axios.get(`${baseURL}/chat/room/job/${chatRoomId}`, header);
    return res?.data?.data && res.data.data[0];
  } catch (e) {
    console.error(e);
  }
}

export const createChatRoom = async (members) => {
  const header = await createHeader();

  try {
    const res = await axios.post(`${baseURL}/chat/room`, members, header);
    return res.data.data;
  } catch (e) {
    console.error(e);
  }
};

export const getMessagesOfChatRoom = async (chatRoomId) => {
  const header = await createHeader();

  try {
    const res = await axios.get(`${baseURL}/chat/message/${chatRoomId}`, header);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const sendMessage = async (messageBody) => {
  const header = await createHeader();

  try {
    const res = await axios.post(`${baseURL}/chat/message`, messageBody, header);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};