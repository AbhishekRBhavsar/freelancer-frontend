import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const backendURL = process.env.REACT_APP_BACKEND_URL;

export const chatApi = createApi({
  reducerPath: 'chatApi',
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
    // getOrganizationSearch: builder.query({
    //   query: ({ search, page, limit }) => ({
    //     url: `/organization?search=${search}&page=${page}&limit=${limit}`,
    //     method: 'GET',
    //   }),
    // }),
    // createOrganization: builder.mutation({
    //   query: (formData) => ({
    //     url: '/organization',
    //     method: 'POST',
    //     body: formData,
    //   }),
    // }),

  }),
});

export const {

} = chatApi;

export const {

} = chatApi.endpoints;