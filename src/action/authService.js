import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const backendURL = process.env.REACT_APP_BACKEND_URL;

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: backendURL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.userToken;
      if (token) {
        // include token in req header
        headers.set('authorization', token);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: (userId) => {
        return {
        url: `/user/${userId}`,
        method: 'GET',
      }},
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
    }),
    getProfileDetails: builder.query({
      query: () => ({
        url: '/profile',
        method: 'GET',
      }),
    }),
    uploadAvatar: builder.mutation({
      query: (formData) => ({
        url: '/avatar',
        method: 'POST',
        body: formData,
      }),
    }),
    updateUserProfile: builder.mutation({
      query: (formData) => ({
        url: '/profile',
        method: 'PUT',
        body: formData,
      }),
    }),
    getClientProfileDetails: builder.query({
      query: () => ({
        url: '/client/profile',
        method: 'GET',
      }),
    }),
    updateClientProfile: builder.mutation({
      query: (formData) => ({
        url: '/client/profile',
        method: 'PUT',
        body: formData,
      }),
    }),
    updateClientProject: builder.mutation({
      query: (formData) => ({
        url: '/client/projects',
        method: 'PUT',
        body: formData,
      }),
    }),
    createOrganization: builder.mutation({
      query: (formData) => ({
        url: '/organization',
        method: 'POST',
        body: formData,
      }),
    }),
    createInvite: builder.mutation({
      query: (formData) => ({
        url: '/invite',
        method: 'POST',
        body: formData,
      }),
    })
  }),
});

export const {
  useGetUserDetailsQuery,
  useLogoutUserMutation,
  useGetProfileDetailsQuery,
  useUploadAvatarMutation,
  useUpdateUserProfileMutation,
  useGetClientProfileDetailsQuery,
  useUpdateClientProfileMutation,
  useUpdateClientProjectMutation,
  useCreateInviteMutation,
} = authApi;

export const {
  getUserDetails,
  logoutUser,
  getProfileDetails,
  updateUserProfile,
  getClientProfileDetails,
  updateClientProfile,
  updateClientProject,
  createInvite,
} = authApi.endpoints;