import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
// import { useAuth } from "../context/AuthContext";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
// import Item from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Navbar, SkillsCard } from "./components";

// https://developers.google.com/identity/gsi/web/reference/js-reference

const Profile = ({ user }) => {
  const { loading, error } = useFetch(
    "http://localhost:5152/api/v1/profile"
  );
  console.log("user", user);

  return (
    <>
      <Navbar />
      <Container fixed>
        <Grid container spacing={2}>
          <Grid item xs={3} my={3} p={1}>
            <Avatar
              alt="Remy Sharp"
              src='https://lh3.googleusercontent.com/a/AGNmyxa-gOBP5W6bb462x5MaZh2ryUbqB1E4S-mv5ZrM8w=s5000-c'
              sx={{ width: 200, height: 200 }}
            />
          </Grid>
          <Grid item xs={9} my={3} p={1}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 1, md: 1 }}>
              <Grid item xs={12} sm={4} md={4} >
                <Box sx={{ minWidth: 275 }}>
                  <Card variant="outlined">{card}</Card>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4} md={4} >
                <SkillsCard />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

      </Container>
    </>
  );
};

// const bull = (
//   <Box
//     component="span"
//     sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
//   >
//   </Box>
// );

const card = (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 30 }} fontWeight="bold" color="text.secondary" gutterBottom>
        Krushit Dudhat
      </Typography>
      <Typography variant="h5" component="div">
        <LocationOnOutlinedIcon /> Ahmedabad, India
      </Typography>
      <Typography sx={{ mt: 1.5 }} color="text.secondary">
        email@gmail.com
      </Typography>
    </CardContent>
  </React.Fragment>
);
export default Profile;