import { createSlice } from '@reduxjs/toolkit'

import { getOrganizationSearch, createOrganization, updateOrganization, createJob } from './jobService';

const jobSlice = createSlice({
  name: 'job',
  initialState: {
    loading: false,
    error: null,
    success: false,
    organizations: {},
    jobs: [],
  },
  reducers: {
    setOrganization: (state, { payload }) => {
      state.organizations = payload
    },
    setJob: (state, { payload }) => {
      state.jobs.unshift(payload);
    }
  },
  extraReducers: {
    [getOrganizationSearch.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [getOrganizationSearch.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.organizations = payload
    },
    [getOrganizationSearch.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },

    [createOrganization.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [createOrganization.fulfilled]: (state, { payload }) => {
      state.loading = false
      // state.organizations = payload
    },
    [createOrganization.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },

    [updateOrganization.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [updateOrganization.fulfilled]: (state, { payload }) => {
      state.loading = false
      // state.organizations = payload
    },
    [updateOrganization.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },

    [createJob.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [createJob.fulfilled]: (state, { payload }) => {
      state.loading = false
      // state.organizations = payload
    },
    [createJob.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
  }
});

export const { setOrganization, setJob } = jobSlice.actions;
export default jobSlice.reducer;
