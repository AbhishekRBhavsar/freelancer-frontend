import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
// import { useAuth } from "../context/AuthContext";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Item from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
// import Link from '@mui/material/Link';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Navbar, SkillsCard } from "./components";
import { Backdrop, CircularProgress } from '@mui/material';
import { SchoolTwoTone, WorkTwoTone, CalendarMonthTwoTone } from '@mui/icons-material';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { useGetProfileDetailsQuery } from '../action/authService';
import { setProfile } from '../action/authSlice';

// https://developers.google.com/identity/gsi/web/reference/js-reference
const getImg = (str) => {
  if (!str.startsWith('http')) {
    return `${process.env.REACT_APP_BACKEND_URL}/${str}`
  }
  return str
}

const Profile = ({ user }) => {

  // const [profile, setProfile] = React.useState(null);
  const { userProfile: profile } = useSelector((state) => state.auth)
  const navigate = useNavigate();

  const { data,  isFetching } = useGetProfileDetailsQuery();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (data) dispatch(setProfile(data.data.user));
  }, [data, dispatch]);

  const toEditProfile = () => {
    navigate('/edit-user', { state: profile  });
  }

  // useEffect(() => {

  // }, [handleProfile]);
  if(!profile) {
    return <div>
      <Backdrop
        sx={{ color: '#fffff', zIndex: (theme) => theme.zIndex.drawer + 5 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  };

  return (
    <>
      <Navbar />
      <Container fixed>
        <Grid container spacing={2}>
          <Grid item xs={3} my={3} p={1}>
            <Avatar
              alt="Remy Sharp"
              src={profile?.picture ? getImg(profile?.picture.replace('=s96', '=s500')) : null}
              sx={{ width: 200, height: 200, margin: 'auto' }}
            />
            <CardContent>
              <Typography sx={{ fontSize: 30 }} fontWeight="bold" color="text.secondary" gutterBottom>
                {profile?.firstName} {profile?.lastName}
              </Typography>
              {profile.location && (
                <Typography variant="h6" component="div">
                  <LocationOnOutlinedIcon fontSize="small" /> {profile?.location}
                </Typography>
              )}
              <Typography sx={{ mt: 1.5 }} color="text.secondary">
                {profile?.email}
              </Typography>
            </CardContent>

            {/* add button for edit profile */}
            <Button variant="outlined" onClick={() => {toEditProfile()}} sx={{ mt: 2, width: '100%', color: '#606060', outlineColor: '#606060' }}>
              <Link to={{
                pathname: 'client/edit',
                user: profile
              }}
                underline="hover"
              >
                Edit Profile
              </Link>
            </Button>


          </Grid>
          <Grid item xs={9} my={3} p={1}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 1, md: 1 }}>
              <Grid item xs={12} sm={4} md={4} >
                <Box sx={{ minWidth: 275 }}>
                  <Card variant="outlined">
                    {/* about your self summery */}
                    <CardContent>
                      <Typography sx={{ fontSize: 24 }}>
                        About
                      </Typography>
                      <Typography component="div">
                        {profile?.about}
                      </Typography>
                    </CardContent>

                  </Card>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4} md={4} >
                {/* framework... */}
                <Typography variant="h6">Skills</Typography>
                <Card variant="outlined" sx={{ display: 'flex', flexWrap: 'wrap', padding: 1, mb: 2 }}>
                  {[...profile?.technologies || [], ...profile?.languages || [], ...profile?.libsAndPackages || [], ...profile?.databases || [], ...profile?.frameworks || []].map((skill) => (
                    <Box
                      sx={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        border: '1px solid #ddd',
                        borderRadius: 3,
                        padding: 1,
                        margin: 0.5,
                        boxShadow: '0px 2px 2px #ccc',
                        maxWidth: 'fit-content',
                      }}
                    >
                      <Typography>{skill}</Typography>
                    </Box>
                  ))}
                </Card>
              </Grid>

              <Grid item xs={12} sm={4} md={4} >
                <Typography variant="h6">Project</Typography>
                <Card variant="outlined" sx={{ padding: 1 }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 24 }}>
                      {profile?.projects && profile?.projects[0]?.title}
                    </Typography>
                    <Typography component="div">
                      {profile?.projects && profile.projects[0]?.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={4} md={4} >
                <Card variant="outlined" sx={{ padding: 1 }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 24 }}>
                      work experience
                    </Typography>

                    {/* one organization.... */}
                    {workExp(profile?.experience && profile?.experience[0])}
                    {/* horizontal line in MUI*/}
                    {/* <Divider sx={{ my: 1 }} /> */}
                    {/* {workExp(profile?.experience[0])} */}
                  </CardContent>
                </Card>
              </Grid>

              {/* Education */}
              <Grid item xs={12} sm={4} md={4} >
                <Card variant="outlined" sx={{ padding: 1 }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 24 }}>
                      Education
                    </Typography>

                    {/* one organization.... */}
                    {Education(profile?.education && profile?.education[0])}
                    {/* horizontal line in MUI*/}
                    <Divider sx={{ my: 1 }} />
                    {/* {Education(profile?.education[0])} */}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

      </Container>
    </>
  );
};

const Education = (edu) => (
  <Grid container sx={{ m: 1 }}>
    <Grid item xs={1.5}>
      <SchoolTwoTone sx={{ fontSize: 70 }} />
    </Grid>
    <Grid item xs={10.5}>
      <Typography sx={{ fontSize: 24 }}>
        {edu?.degree}
      </Typography>
      {/* university name and degree year with verticle line inbitween*/}
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Typography variant="subtitle1">{edu?.school}</Typography>
        </Grid>
        <Grid item>
          <Divider orientation="vertical" sx={{ height: 40 }} />
        </Grid>
        <Grid item>
          <Typography variant="subtitle1">
            <CalendarMonthTwoTone sx={{ fontSize: 20 }} />
            {edu?.startDate && new Date(edu?.startDate).toLocaleDateString()} - {edu?.endDate ? new Date(edu.endDate).toLocaleDateString() : '-'}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

const workExp = (exp) => (
  <Grid container sx={{ m: 1 }}>
    <Grid item xs={1.5}>
      <WorkTwoTone sx={{ fontSize: 70 }} />
    </Grid>
    <Grid item xs={10.5}>
      <Typography sx={{ fontSize: 24 }}>
        {exp?.position}
      </Typography>
      {/* organization name and date side by side */}
      <Grid container>
        <Grid item xs={6}>
          <Typography sx={{ fontSize: 16 }}>
            {exp?.company}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography sx={{ fontSize: 16 }}>
            <CalendarMonthTwoTone sx={{ fontSize: 20 }} />
            {exp?.startDate ? new Date(exp.startDate).toLocaleDateString() : '-'} - {exp?.endDate ? new Date(exp.endDate).toLocaleDateString() : 'Present'}
          </Typography>
        </Grid>
      </Grid>
      <Typography component="div">
        {exp?.description}
      </Typography>
    </Grid>
  </Grid>
);

export default Profile;