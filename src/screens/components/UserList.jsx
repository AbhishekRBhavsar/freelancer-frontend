import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { Backdrop, CircularProgress, Paper, Stack, Pagination, InputBase, Tooltip, IconButton } from '@mui/material';
import { SchoolTwoTone, LocationOnTwoTone, SearchTwoTone, ChatBubbleOutline } from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import debounce from "lodash.debounce";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

// Create formatter (English).
import { useSelector, useDispatch } from 'react-redux';
import { useGetProfileDetailsQuery } from '../../action/authService';
import { useGetJobSearchQuery } from '../../action/jobService';
import { setProfile } from '../../action/authSlice';
import { getAdminUsers } from "../../services/ChatService";
import { createChatRoom } from "../../services/ChatService";

// https://developers.google.com/identity/gsi/web/reference/js-reference
const getImg = (str) => {
  if (!str.startsWith('https')) {
    return `${process.env.REACT_APP_BACKEND_URL}/${str}`
  }
  return str
}

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
  position: 'relative',
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

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha('#0062cc', 0.15),
  '&:hover': {
    backgroundColor: alpha('#0062cc', 0.25),
  },
  marginLeft: 0,
  marginRight: '1rem',
  width: '100%',
  height: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const UserList = ({ user }) => {
  const [users, setUsers] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);
  const [search, setSearch] = React.useState('');
  const [isFetching, setIsFetching] = React.useState(false);
  const debouncedSearchTerm = useDebounce(search, 500)
  const navigate = useNavigate();

  // const { data, isFetching } = useGetJobSearchQuery({ search: debouncedSearchTerm, page, limit });
  const { userInfo } = useSelector((state) => state.auth);
  // const dispatch = useDispatch();

  // React.useEffect(() => {
  //   if (data) {
  //     setJobs(data.data);
  //   }
  // }, [data, dispatch]);
  useEffect(() => {
    setIsFetching(true);
    const fetchData = async () => {
      const res = await getAdminUsers({ search: debouncedSearchTerm, page, limit});
      setUsers(res.data);
      setIsFetching(false);
    };

    fetchData();
  }, [debouncedSearchTerm, page, limit]);

  const handlePageChange = (event, value) => {
    setPage(value);
  }


  if (isFetching) {
    return <div>
      <Backdrop
        sx={{ color: '#0288d1', zIndex: (theme) => theme.zIndex.drawer + 5 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  };

  return (
    <>
      <Container fixed>
        <Paper style={{ borderRadius: '16px 40px' }}>
          <Box style={{ display: 'flex', justifyContent: 'space-between', padding: '0.7rem', marginTop: '0.5rem', borderLeft: "1rem solid #0288d1", borderRight: "1rem solid #0288d1", borderRadius: '16px 40px' }}>
            <Typography variant="h5" sx={{ fontFamily: 'Georgia, serif', margin: '0.2rem', marginLeft: '1rem' }} gutterBottom>
              Users
            </Typography>
            <Box style={{}}>
              <Search>
                <SearchIconWrapper>
                  <SearchTwoTone />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Search>
            </Box>
          </Box>
        </Paper>
        <Grid container spacing={2}>
          <Grid item xs={12} my={3} p={1}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 1, md: 1 }}>
              <Grid item xs={12} sm={4} md={4} >
                {users && users.length > 0 ? users.map((user, index) => {
                  user = user.user;
                  const userData = user.userDetails;
                  return (
                    <JobCard key={user._id} variant="outlined" sx={{ padding: 1, margin: 1, borderLeft: "1rem solid #0288d1", borderRadius: '16px' }}>
                      <CardContent sx={{ paddingBottom: 0 }}>
                        <Box style={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="subtitle1" style={{ flexBasis: '20rem' }}>
                          {user.firstName + " " + user.lastName}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
                          Id: {user._id}
                        </Typography>
                        </Box>
                        <Box style={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="subtitle1" style={{ flexBasis: '20rem' }}>
                            email: {user.email}
                          </Typography>
                          <Typography variant="subtitle1" sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
                            gender: {user.gender}
                          </Typography>
                        </Box>
                        <Box style={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="subtitle1" style={{ flexBasis: '20rem' }}>
                            role: {user.role}
                          </Typography>
                        </Box>
                      </CardContent>
                      <Divider sx={{ my: 1 }} />
                      <div sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        {[...userData?.technologies || [], ...userData?.languages || [], ...userData?.libsAndPackages || [], ...userData?.databases || [], ...userData?.frameworks || []].map((skill) => (
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

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = debounce(() => {
      setDebouncedValue(value);
    }, delay);

    handler();

    return () => {
      handler.cancel();
    };
  }, [value, delay]);

  return debouncedValue;
}

export default UserList;