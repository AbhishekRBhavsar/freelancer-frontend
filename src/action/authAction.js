import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const backendURL = process.env.REACT_APP_BACKEND_URL;
export const registerUser = createAsyncThunk(
  'auth/signup',
  async ({ credential, role }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const { data } = await axios.post(
        `${backendURL}/signup`,
        { credential, role },
        config
      );
      localStorage.setItem('userToken', data.data.token);
      cookies.set('user', JSON.stringify(data.data.user), { maxAge: 86400 });
      return data.data;
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ credential }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const { data } = await axios.post(
        `${backendURL}/login`,
        { credential },
        config
      )

      localStorage.setItem('userToken', data.data.token);
      cookies.set('user', JSON.stringify(data.data.user), { maxAge: 86400 });
      return data.data;
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

// export const logout = createAsyncThunk(
//   'auth/logout',
//   async ({rejectWithValue}) => {
//     try {
//       const config = {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }
//       const token = getState().auth.userToken;
//       if (token) {
//         // include token in req header
//         headers.set('authorization', token);
//       }
//       await axios.post(
//         `${backendURL}/logout`,
//         config
//       );
//     } catch (error) {
//       // return custom error message from backend if present
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message)
//       } else {
//         return rejectWithValue(error.message)
//       }
//     }
//   }
// )