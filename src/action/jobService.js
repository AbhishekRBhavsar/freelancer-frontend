import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const backendURL = process.env.REACT_APP_BACKEND_URL;

export const jobApi = createApi({
  reducerPath: 'jobApi',
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
    getOrganizationSearch: builder.query({
      query: ({ search, page, limit }) => ({
        url: `/organization?search=${search}&page=${page}&limit=${limit}`,
        method: 'GET',
      }),
    }),
    createOrganization: builder.mutation({
      query: (formData) => ({
        url: '/organization',
        method: 'POST',
        body: formData,
      }),
    }),
    updateOrganization: builder.mutation({
      query: (formData) => ({
        url: 'client/org',
        method: 'PATCH',
        body: formData,
      }),
    }),
    createJob: builder.mutation({
      query: (formData) => ({
        url: '/job',
        method: 'POST',
        body: formData,
      }),
    }),
    getClientJobs: builder.query({
      query: ({ page, limit }) => ({
        url: `/client/jobs?page=${page}&limit=${limit}`,
        method: 'GET',
      }),
    }),
    getJobSearch: builder.query({
      query: ({ search, page, limit }) => ({
        url: `/job?search=${search}&page=${page}&limit=${limit}`,
        method: 'GET',
      }),
    }),

  }),
});

export const {
  useGetOrganizationSearchQuery,
  useCreateOrganizationMutation,
  useUpdateOrganizationMutation,
  useCreateJobMutation,
  useGetClientJobsQuery,
  useGetJobSearchQuery,
} = jobApi;

export const {
  getOrganizationSearch,
  createOrganization,
  updateOrganization,
  createJob,
  getClientJobs,
  getJobSearch,
} = jobApi.endpoints;