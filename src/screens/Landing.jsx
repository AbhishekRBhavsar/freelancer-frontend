import React from "react";
import { Link } from "react-router-dom";
import { Grid, Box, MenuItem, Select } from '@mui/material';
import { Header } from "./components";

import { useSelector, useDispatch } from 'react-redux';
import { setRole } from "../action/authSlice";

const Landing = () => {

  let { role } = useSelector((state) => state.auth);
  const [value, setValue] = React.useState(role);

  const dispatch = useDispatch();

  const handleRole = (event, index, value) => {
    setValue(event.target.value);
  }

  React.useEffect(() => {
    dispatch(setRole(value));

  }, [role, dispatch, value]);

  return (
    <>
      <Header />
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
            <h1>Freelance</h1>
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

          <Select
            value={role}
            label={'I am '}
            id="select-role"
            onChange={handleRole}
            sx={{ width: "100%", marginBottom: "1rem", color: "#000000" }}
          >
            <MenuItem value={'Developer'} > Developer </MenuItem>
            <MenuItem value={'Client'} > Hire Developer </MenuItem>
            <MenuItem value={'admin'} > Admin </MenuItem>
          </Select>
          <main style={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
            <Link
              disabled
              to="/signup"
              style={{
                textDecoration: "none",
                border: "1px solid gray",
                padding: "0.5rem 1rem",
                backgroundColor: "#81E4AA",
                color: "#000000",
              }}

            >
              Sign Up
            </Link>
            <Link
              disabled
              to="/login"
              style={{
                textDecoration: "none",
                border: "1px solid gray",
                padding: "0.5rem 1rem",
                backgroundColor: "#81E4AA",
                color: "#000000",
              }}
            >
              Login
            </Link>
          </main>
        </Grid>

      </Grid>

    </>
  );
};

export default Landing;