import { configureStore } from '@reduxjs/toolkit'
import authReducer from './action/authSlice';
import jobReducer from './action/jobSlice';
import { authApi } from './action/authService';
import { jobApi } from './action/jobService';

const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    job: jobReducer,
    [jobApi.reducerPath]: jobApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware).concat(jobApi.middleware),
})
export default store