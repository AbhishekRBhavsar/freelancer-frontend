import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home, Landing, Login, Signup, Profile, EditUser, ClientProfile, ClientHome, ClientEditProfile, ClientJobCreate, ClientJobs, Chat, FAQ, Invite, AdminDashBoard, AdminUserActivity } from "./screens";
import { useSelector } from 'react-redux';
import { useGetUserDetailsQuery } from './action/authService';
import { setCredentials } from './action/authSlice';
import { useDispatch } from 'react-redux';
import { ProtectedRoute } from './screens/components';
import { Backdrop, CircularProgress } from '@mui/material';

const App = () => {
  let { userInfo: user, userProfile: profile, userToken, clientProfile } = useSelector(
    (state) => state.auth
  )
  const dispatch = useDispatch();
  let { data, isFetching, error } = useGetUserDetailsQuery('');

  React.useEffect(() => {

    if (data) dispatch(setCredentials(data.data.user));

  }, [data, dispatch, isFetching]);

  if (!user?.role && userToken) {
    if (localStorage.getItem('userToken')) {
      return (
        <Backdrop
          sx={{ color: '#000000', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )
    }
  }


  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={(user?.role === 'developer') ? <Navigate to="/home" /> : (user?.role === 'client') ? <Navigate to="/client/jobs" /> : (user?.role === 'admin') ? <Navigate to="/admin" /> : <Landing />}
        />
        <Route
          path="/signup"
          element={(user?.role === 'developer') ? <Navigate to="/home" /> : (user?.role === 'client') ? <Navigate to="/client/jobs" /> : (user?.role === 'admin') ? <Navigate to="/admin" /> : <Signup />}
        />
        <Route
          path="/login"
          element={(user?.role === 'developer') ? <Navigate to="/home" /> : (user?.role === 'client') ? <Navigate to="/client/jobs" /> : (user?.role === 'admin') ? <Navigate to="/admin" /> : <Login />}
        />
        <Route
          path="/faq"
          element={user.role ? <FAQ /> : <Navigate to="/" />}
        />
        <Route
          path="/invite"
          element={user.role ? <Invite /> : <Navigate to="/" />}
        />

        <Route element={<ProtectedRoute />}>
          <Route
            path="/admin"
            element={user?.role === 'admin' ? <AdminDashBoard user={user} /> : <Navigate to="/" />}
          />
          <Route
            path="/admin/user-activity"
            element={user?.role === 'admin' ? <AdminUserActivity user={user} /> : <Navigate to="/" />}
          />
          <Route
            path="/home"
            element={user?.role === 'developer' ? <Home user={user} /> : <Navigate to="/" />}
          />
          <Route
            path="/profile"
            // element={<Profile />}
            element={user?.role === 'developer' ? <Profile user={user} /> : <Navigate to="/" />}
          />
          <Route
            path="/chat/:search?"
            element={user?.role === 'developer' ? <Chat /> : <Navigate to="/" />}
          />
          <Route
            path="/edit-user"
            element={(user?.role === 'developer' && profile?.email) ? <EditUser userProfile={profile} /> : <Navigate to="/profile" />}
          // element={user?.email ? <EditUser user={user} /> : <Navigate to="/" />}
          />
          <Route
            path="/client/home"
            element={user?.role === 'client' ?
              // <ClientHome user={user} /> : 
              <Navigate to="/client/jobs" /> :
              <Navigate to="/" />
            }
          />
          <Route
            path="/client/profile"
            // element={<Profile />}
            element={user?.role === 'client' ? <ClientProfile user={user} /> : <Navigate to="/" />}
          />
          <Route
            path="/client/chat"
            element={user?.role === 'client' ? <Chat user={user} /> : <Navigate to="/" />}
          />
          <Route
            path="/client/edit"
            element={(user?.role === 'client' && clientProfile?.email) ? <ClientEditProfile userProfile={profile} /> : <Navigate to="/client/profile" />}
          />
          <Route
            path="/client/jobs"
            element={user?.role === 'client' ? <ClientJobs user={user} /> : <Navigate to="/" />}
          />
          <Route
            path="/client/job/create"
            element={user?.role === 'client' ? <ClientJobCreate user={user} /> : <Navigate to="/" />}
          />

        </Route>
        {/* <Route
          path="/chat"
          element={<Chat />}
        /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;