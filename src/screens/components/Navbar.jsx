import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

import { useDispatch, useSelector } from 'react-redux';
import { useLogoutUserMutation } from '../../action/authService';
import { logout } from '../../action/authSlice';
import { useNavigate } from 'react-router-dom';
import Profile from '../Profile';
import Loading from './Loading';
import Cookies from 'universal-cookie';

const pages = ['Profile', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const { userInfo } = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookies = new Cookies();

  // const { data, isFetching } = useGetUserDetailsQuery('userDetails', {
  //   // perform a refetch every 15mins
  //   pollingInterval: 900000,
  // });

  // React.useEffect(() => {
  //   if (data) dispatch(setCredentials(data.data.user))
  // }, [data, dispatch])

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav();
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const [logoutUser] = useLogoutUserMutation();

  const handleLogout = () => {
    setOpen(true);
    logoutUser()
      .then(() => {
        dispatch(logout());
        cookies.remove('user');
      })
      .catch((err) => console.log(err));
  }

  React.useEffect(() => {
    if (userInfo) {
      setOpen(false);
    } else {
      setTimeout(() => {
        setOpen(false);
        navigate('/');
      }, 1000);
    }
  }, [navigate, userInfo]);
  return (
    <AppBar position="static">
      <Loading value={open} />
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href={userInfo?.role === 'client' ? '/client/home' : '/home'}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            FreeLancer by BrownSugar
          </Typography>

          {(() => {
            if (userInfo?.role === 'client') {
              return (
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: 'block', md: 'none' },
                    }}
                  >
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">Home</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">Jobs</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">Profile</Typography>
                    </MenuItem>

                  </Menu>
                </Box>
              )
            } else if (userInfo?.role === 'developer') {
              return (
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: 'block', md: 'none' },
                    }}
                  >
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">Home</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">Jobs</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">Profile</Typography>
                    </MenuItem>

                  </Menu>
                </Box>
              )
            }
          })()
          }
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            FreeLancer by BrownSugar
          </Typography>

          {(() => {
            if (userInfo?.role === 'client') {
              return (
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                  {/* <Button
                    onClick={() => {
                      navigate('/client/home');
                      handleCloseNavMenu();
                    }}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Home
                  </Button> */}
                  <Button
                    onClick={() => {
                      navigate('/client/jobs');
                      handleCloseNavMenu();
                    }}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Jobs
                  </Button>
                  <Button
                    onClick={() => {
                      navigate('/client/chat');
                      handleCloseNavMenu();
                    }}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Chat
                  </Button>
                  <Button
                    onClick={() => {
                      navigate('/client/profile');
                      handleCloseNavMenu();
                    }}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Profile
                  </Button>
                  <Button
                    onClick={() => {
                      navigate('/invite');
                      handleCloseNavMenu();
                    }}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Refer
                  </Button>
                  <Button
                    onClick={() => {
                      navigate('/faq');
                      handleCloseNavMenu();
                    }}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    FAQ
                  </Button>
                </Box>
              )
            } else if (userInfo?.role === 'developer') {
              return (
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                  <Button
                    onClick={() => {
                      navigate('/home');
                      handleCloseNavMenu();
                    }}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Home
                  </Button>
                  <Button
                    onClick={() => {
                      navigate('/chat');
                      handleCloseNavMenu();
                    }}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Chat
                  </Button>
                  <Button
                    onClick={() => {
                      navigate('/profile');
                      handleCloseNavMenu();
                    }}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Profile
                  </Button>
                  {/* <Button
                    onClick={() => {
                      navigate('/client/profile');
                      handleCloseNavMenu();
                    }}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    INBOX
                  </Button> */}
                  <Button
                    onClick={() => {
                      navigate('/invite');
                      handleCloseNavMenu();
                    }}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Refer
                  </Button>
                  <Button
                    onClick={() => {
                      navigate('/faq');
                      handleCloseNavMenu();
                    }}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    FAQ
                  </Button>
                  {/* <Button
                    onClick={() => {
                      navigate('/client/profile');
                      handleCloseNavMenu();
                    }}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    
                  </Button> */}
                </Box>
              )
            } else if (userInfo?.role === 'admin') {
              return (
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                  <Button
                    onClick={() => {
                      navigate('/admin');
                      handleCloseNavMenu();
                    }}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Dashboard
                  </Button>
                  {/* <Button
                    onClick={() => {
                      navigate('/chat');
                      handleCloseNavMenu();
                    }}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Chat
                  </Button> */}
                  <Button
                    onClick={() => {
                      navigate('/admin/user-activity');
                      handleCloseNavMenu();
                    }}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    User Activity
                  </Button>

                </Box>
              )
            }
          })()
          }
          {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))} */}

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={userInfo.firstName} src={getImg(userInfo.picture)} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {/* {settings.map((setting) => ( */}
              <MenuItem key="Profile" onClick={() => {
                if (userInfo.role === 'developer') {
                  navigate('/profile');
                } else if (userInfo.role === 'client') {
                  navigate('/client/profile');
                } else {
                  navigate('/');
                }
              }}>
                <Typography textAlign="center">profile</Typography>
              </MenuItem>
              <MenuItem key="Logout" onClick={() => handleLogout()}>
                <Typography textAlign="center">Log out</Typography>
              </MenuItem>
              <MenuItem key="setting" onClick={() => { }}>
                <Typography textAlign="center">Setting</Typography>
              </MenuItem>
              {/* ))} */}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

const getImg = (str) => {
  if (!str.startsWith('http')) {
    return `${process.env.REACT_APP_BACKEND_URL}/${str}`
  }
  return str
}

export default Navbar;
