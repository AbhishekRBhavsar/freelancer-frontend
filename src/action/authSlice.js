import { createSlice } from '@reduxjs/toolkit'
import { registerUser, loginUser } from './authAction';
import { getUserDetails, logoutUser, getProfileDetails, updateUserProfile, updateClientProfile, createInvite } from './authService';


const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null;

const profileEmpty = {
  firstName: '',
  lastName: '',
  email: '',
  location: '',
  about: '',
  education: [
    {
      school: '',
      degree: '',
      startDate: '',
      endDate: '',
    },
  ],
  experience: [],
  projects: [],
  technologies: [],
  libsAndPackages: [],
  frameworks: [],
  databases: [],
  languages: [],
}

// const clientProfile = {};

const initialState = {
  loading: false,
  userInfo: {}, // for user object
  userToken: userToken, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
  userProfile: profileEmpty,
  clientProfile: {},
  role: 'Developer',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userToken')
      state.userToken = null
      state.userInfo = {}
      state.loading = false
      state.error = null
      state.success = false
      state.userProfile = profileEmpty
      state.clientProfile = {}
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload
    },
    setProfile: (state, { payload }) => {
      if (payload.role === 'developer') {
        state.userProfile = payload
      } else {
        state.clientProfile = payload
      }
    },
    setRole: (state, { payload }) => {
      state.role = payload
    }
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.userInfo = payload.user
      state.userToken = payload.token
      state.success = true // registration successful
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },

    [loginUser.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      if (!payload.user?.picture?.startsWith('http')) {
        payload.user.picture = `${process.env.REACT_APP_BACKEND_URL}/${payload.user.picture}`
      }
      state.loading = false
      state.userInfo = payload.user
      state.userToken = payload.token
      state.success = true // registration successful
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },

    [getUserDetails.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [getUserDetails.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.success = true
    },
    [getUserDetails.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },

    [getProfileDetails.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [getProfileDetails.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.success = true
    },
    [getProfileDetails.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },

    [updateUserProfile.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [updateUserProfile.fulfilled]: (state, { payload }) => {
      // if (!payload.picture?.startsWith('http')) {
      //   payload.picture = `${process.env.REACT_APP_BACKEND_URL}/${payload.picture}`
      // }
      state.loading = false
      state.success = true
      state.userProfile = payload
    },
    [updateUserProfile.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },

    [updateClientProfile.pending]: (state) => {
      state.loading = true
      state.error = null
      state.success = false
    },
    [updateClientProfile.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.success = true
      state.clientProfile = payload
    },
    [updateClientProfile.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
      state.success = false
    },

    [createInvite.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [createInvite.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.success = true
    },
    [createInvite.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },

  },
})

export const { logout, setCredentials, setProfile, setRole } = authSlice.actions;
export default authSlice.reducer