import React, { useEffect } from "react";
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Header, Loading } from "./components";

// https://developers.google.com/identity/gsi/web/reference/js-reference

const SignUp = () => {
  const { loading, userInfo, error, success, role } = useSelector(
    (state) => state.auth
  )
  const { handleGoogleSignup } = useFetch();
  const navigate = useNavigate();

  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleGoogleSignup,
      });

      google.accounts.id.renderButton(document.getElementById("signUpDiv"), {
        // type: "standard",
        theme: "filled_black",
        // size: "small",
        text: "continue_with",
        shape: "pill",
      });

      google.accounts.id.prompt();
    }
  }, [handleGoogleSignup]);

  useEffect(() => {
    if (role === 'admin') {
      navigate('/login');
    }
  }, [role, navigate]);

  useEffect(() => {
      // redirect user to login page if registration was successful
      if (success) {
        if (userInfo.role === 'developer') {
          navigate('/profile');
        } 
        if (userInfo.role === 'client') {
          navigate('/client/profile');
        }
      }
      // redirect authenticated user to profile screen
      if (userInfo && userInfo.email) {
        if (userInfo.role === 'developer') {
          navigate('/home');
        }
        if (userInfo.role === 'client') {
          navigate('/client/home');
        }
      }
  }, [navigate, userInfo, success]);

  return (
    <>
    <Header />
      <Loading value={!(!success && !Boolean(userInfo.email))}/>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ backgroundColor: '#E0FAE9', minHeight: '100vh' }}
      >
        <Grid item xs={3} sx={{
          p: 2,
          backgroundColor: "#9CC0F2",
          border: "3px solid #8F43AD",
        }}>
          <header style={{ textAlign: "center" }}>
            <h1>Register to continue</h1>
          </header>
          <Box
            component="img"
            sx={{
              borderRadius: 1,
              mb: 2,
              height: 300,
              width: '100%',
              // maxHeight: { xs: 233, md: 167 },
              // maxWidth: { xs: 350, md: 250 },
            }}
            alt="The house from the offer."
            src="https://images.unsplash.com/photo-1551275073-f8adef647c1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1167&q=80"
          />

          <main style={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
            <main
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {!success && !error && <p>Signup as {role}</p>}
              {error && <p style={{ color: "red" }}>Signup Error! Try again.</p>}
              {loading ? (
                <div>Loading....</div>
              ) : (
                <div id="signUpDiv" data-text="signup_with"></div>
              )}

              <nav style={{ padding: "2 rem", marginTop: 7 }}>
                <Link to="/">Go Back</Link>
              </nav>
            </main>
            <footer>
            </footer>
          </main>
        </Grid>
      </Grid>
    </>
  );
};

export default SignUp;