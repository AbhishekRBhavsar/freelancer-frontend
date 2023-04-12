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
import { Backdrop, CircularProgress, Paper, Stack, Pagination } from '@mui/material';
import { SchoolTwoTone, LocationOnTwoTone, Add, LocationCityTwoTone } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

// Create formatter (English).
import { useSelector, useDispatch } from 'react-redux';
import { useGetClientProfileDetailsQuery } from '../action/authService';
import { useGetClientJobsQuery } from '../action/jobService';
import { setProfile } from '../action/authSlice';

// https://developers.google.com/identity/gsi/web/reference/js-reference
const getImg = (str) => {
  if (!str.startsWith('https')) {
    return `${process.env.REACT_APP_BACKEND_URL}/${str}`
  }
  return str
}
TimeAgo.addDefaultLocale(en);

const JobButton = styled(Button)({
  '&:hover': {
    backgroundColor: '#81d4fa',
    borderColor: '#0062cc',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#0062cc',
    borderColor: '#005cbf',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
});

const JobCard = styled(Card)({
  '&:hover': {
    borderColor: '#0062cc',
    boxShadow: '1 1 1 1 rgba(0,123,255,.5)',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#b3e5fc',
    borderColor: '#005cbf',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
});

const ClientJobs = ({ user }) => {
  const timeAgo = new TimeAgo('en-US');
  // const [profile, setProfile] = React.useState(null);
  const { clientProfile: profile } = useSelector((state) => state.auth);
  const [jobs, setJobs] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);
  const navigate = useNavigate();

  const { data, isFetching } = useGetClientJobsQuery({ page, limit });
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (data) {
      setJobs(data.data);
    }
  }, [data, dispatch]);

  const handlePageChange = (event, value) => {
    setPage(value);
  }

  if (isFetching) {
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
        <Paper style={{ borderRadius: '16px 40px' }}>
          <Box style={{ display: 'flex', justifyContent: 'space-between', padding: '0.7rem', marginTop: '0.5rem', borderLeft: "1rem solid #0288d1", borderRight: "1rem solid #0288d1", borderRadius: '16px 40px' }}>
            <Typography variant="h5" sx={{ p: 1, fontFamily: 'Georgia, serif', margin: '0.2rem' }} gutterBottom>
              Jobs
            </Typography>
            <JobButton
              variant="elevated"
              size="medium"
              style={{ height: '3rem', margin: '0.2rem', border: '4px solid #03a9f4', borderRadius: '16px 40px' }}
              onClick={() => { navigate('/client/job/create') }}
              endIcon={<Add />}>
              Job
            </JobButton>
          </Box>
        </Paper>
        <Grid container spacing={2}>
          <Grid item xs={12} my={3} p={1}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 1, md: 1 }}>
              <Grid item xs={12} sm={4} md={4} >
                {jobs && jobs.length > 0 ? jobs.map((job, index) => {
                  return (
                    <JobCard variant="outlined" sx={{ padding: 1, margin: 1, borderLeft: "1rem solid #0288d1", borderRadius: '16px' }}>
                      <CardContent sx={{ paddingBottom: 0 }}>
                        <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography sx={{ fontSize: 24, textDecorationLine: "underline" }}>
                            {job.title}
                          </Typography>
                          <Typography variant="subtitle1" sx={{ textAlign: 'right', mb: 1 }}>
                            {timeAgo.format(new Date(job.createdAt), 'twitter-now')}
                          </Typography>
                        </Box>
                        <Typography component="div" sx={{ mb: 1 }}>
                          {job.description}
                        </Typography>
                        <Box style={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="subtitle1" style={{ flexBasis: '20rem' }}>
                            Job type: {job.jobType}
                          </Typography>
                          <Typography variant="subtitle1" sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
                            <LocationOnTwoTone sx={{ mr: 1 }} />
                            {job.location}
                          </Typography>
                        </Box>
                        <Box style={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="subtitle1" style={{ flexBasis: '20rem' }}>
                            Position: {job.position}
                          </Typography>
                          <Typography variant="subtitle1">
                            Status: {job.status}
                          </Typography>
                        </Box>
                        <Box style={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="subtitle1" style={{ flexBasis: '20rem' }}>
                            Budget: {job.budget} $
                          </Typography>
                          <Typography variant="subtitle1">
                            Hourly rate: {job.hourlyRate} $ / Hour
                          </Typography>
                        </Box>
                        <Typography variant="subtitle1">
                          Duration: {job.duration} Months
                        </Typography>
                      </CardContent>
                      <Divider sx={{ my: 1 }} />
                      <div sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        {job.skills.map((skill) => (
                          <Button key={skill} size="small" variant="outlined" sx={{ mr: 1, mb: 1 }}>
                            {skill}
                          </Button>
                        ))}
                      </div>
                    </JobCard>
                  )
                }) : (
                  <Card variant="outlined" sx={{ padding: 1 }}>
                    No Jobs found please create a new job
                  </Card>
                )}
              </Grid>
            </Grid>
            <Divider variant="middle" />
            <Stack spacing={2} m={2} style={{ display: 'flex', alignItems: 'end' }}>
              <Pagination count={3} page={page} onChange={handlePageChange} color="primary" />
            </Stack>
            <Divider variant="middle" />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ClientJobs;