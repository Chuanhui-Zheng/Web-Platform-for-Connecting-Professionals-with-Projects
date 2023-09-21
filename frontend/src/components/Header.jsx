import * as React from 'react';
import { AppBar, Box, Button, Typography, Toolbar, CssBaseline } from '@mui/material';
import { useNavigate, Navigate } from 'react-router-dom';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Logout from '@mui/icons-material/Logout';
import NotificationImportantOutlinedIcon from '@mui/icons-material/NotificationImportantOutlined';
import decodeJWT from "../decodeJWT";
import { apiGet } from '../api';
import { useHeader } from '../context/HeaderContext';

// divider spacing style
const dividerStyle = {
  borderLeft: '1px solid #628388',
  margin: '15px'
};

/**
 * 
 * @returns 
 * 
 * Header component acts as a navigation bar to direct to different pages.
 */
function Header() {
  const navigate = useNavigate();
  const [token, setToken] = React.useState(localStorage.getItem("token"));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchor, setAnchor] = React.useState(null);
  const [notifications, setNotifs] = React.useState(null);
  const [newNotif, setNewNotifs] = React.useState(false);
  const [userType, setUserType] = React.useState(null);
  const [photo, setNewPhoto] = React.useState(null);
  const { reloadHeader } = useHeader();
  
  const open = Boolean(anchorEl);
  const openNotif = Boolean(anchor);

  // Profile menu handlers
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Notification handler click
  const handleNotifs = (event) => {
    setAnchor(event.currentTarget);
  };
  const handleNotifs2 = () => {
    setAnchor(null);
  };

  // check if user logged in via fetch token continuously
  React.useEffect(() => {
    setInterval(() => {
      const glob = localStorage.getItem("token");
      setToken(glob);
    }, [])
  }, 5000);

  // get notifications for user and their user details
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token != null) {
      const tokenData = decodeJWT(token);
      setUserType(tokenData.userType)

      if (tokenData.userType === 'professional') {
        apiGet('/notifications/get', `professionalId=${tokenData.userId}`)
        .then(data => {
          if (!data.error) {
            setNotifs(data);
            if (notifications !== null && notifications.length !== data.length) {
              setNewNotifs(true);
            }
          } else {
            console.error("Error fetching notif list:", data.error);
          }
        })
        .catch(err => {
          console.error("Failed to fetch notif list:", err);
        })
          
      } else if (tokenData.userType === 'company') {
        setNotifs(null);
        setNewNotifs(false);
      }
      
      apiGet(`/user/details/${tokenData.userType}`, `id=${tokenData.userId}`)
      .then((data) => {
        if (!data.error) {
          if (tokenData.userType === "company") {
            setNewPhoto(data.companyLogo);
          } else if (tokenData.userType === "professional") {
            setNewPhoto(data.professionalPhoto);
          }
        } else {
          throw new Error("Get Profile Failed");
        }
      })
      .catch(() => {
        alert("Profile fetch5 failed.");
      });
    }
  }, [reloadHeader])

  // logout user and clear storage
  function logout() {
    localStorage.clear()
    navigate('/')
    return <Navigate to="/" />
  }

  // profile button handler
  function viewProfile() {
    const token1 = localStorage.getItem("token");
    if (token1 != null) {
      const tokenData = decodeJWT(token1);
      navigate(`/profile/${tokenData.userId}`);
    }
  }

  return (
    <Box sx={{backgroundColor: 'pink'}}>
      <CssBaseline />
      <AppBar position="fixed" sx={{backgroundColor: "#344649",}}>
        <Toolbar sx={{justifyContent: "space-between",  "@media (min-width: 0px)": { paddingRight: "25px", paddingLeft: "25px" },}}>
          <Typography
            variant="h6"
            onClick={() => { navigate('/') }}
            sx={{cursor:'pointer'}}
          >
            <b> ProJector.</b>
          </Typography>
        <>
        <Box>
          {userType != null && token ? <>
            <Button name="dashboard" color="inherit" onClick={() => { navigate('/dashboard') }} 
            sx={{ 
            textTransform: 'none',
            '&:hover': {
              color: '#f78e5b',
              transform: 'scale(1.2)',
            },
            }}>
              Dashboard
            </Button>
            <span style={dividerStyle}> </span>
          </>
          : 
          <></>
          }
          <Button name="allProjects" color="inherit" onClick={() => { navigate('/allprojects') }} sx={{ 
          textTransform: 'none',
          '&:hover': {
          color: '#f78e5b',
          transform: 'scale(1.2)',
          },
          }}>
            Browse Projects
          </Button>
          <span style={dividerStyle}> </span> 
          <Button name="aboutus" color="inherit" onClick={() => { navigate('/aboutus') }} sx={{ 
          textTransform: 'none',
          '&:hover': {
            color: '#f78e5b',
            transform: 'scale(1.2)',
          },
          }}>
            About Us
          </Button>
        </Box>
        {token ?  (<>
        <Box>
          <>
          <IconButton
            onClick={handleNotifs}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'notif-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          > 
          {newNotif ? <NotificationImportantOutlinedIcon sx={{color:'#f78e5b'}}></NotificationImportantOutlinedIcon>: <NotificationsNoneIcon sx={{color:'white'}}></NotificationsNoneIcon> }
  
          </IconButton></>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar src={photo} sx={{ bgcolor: '#F29465', width: 32, height: 32 }} />
          </IconButton>
        </Box>
        <Menu
          anchorEl={anchor}
          id="notif-menu"
          open={openNotif}
          onClose={handleNotifs2}
          onClick={handleNotifs2}
          slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {notifications === null ? 
          <Box sx={{pl:1, pr:1}}>
            <Typography color="text.secondary" sx={{fontSize:'14px'}}>Currently No Notifications! Check back Later!</Typography>
          </Box>
          :
          <Box>
            {notifications.map((notif, idx) => (
              <MenuItem key={idx}>
                <Box sx={{display:'flex', flexDirection:'column', fontSize:'13px', width:'100%'}}>
                  {notif.professionalNotificationMessage}
                  <Box sx={{fontSize:'12px', display:'flex', justifyContent:'flex-end'}}>
                    <Typography color="text.secondary" sx={{fontSize:'12px'}}> 
                      {notif.professionalNotificationTime} - {notif.professionalNotificationDate}
                    </Typography>
                  </Box>
                  <Divider />
                </Box>
              </MenuItem>
            ))}
          </Box>}
        </Menu>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {userType === 'company' && 
          <MenuItem onClick={viewProfile}>
            Profile
          </MenuItem>}
          {userType === 'professional' && 
          <MenuItem onClick={viewProfile}>
            Profile
          </MenuItem>}
          <Divider />
          <MenuItem onClick={logout}>
          <ListItemIcon onClick={logout}>
            <Logout fontSize="small" />
          </ListItemIcon >
            Logout
          </MenuItem>
        </Menu>
        </>) : (<>
          <Box>
            <><Button name="registerBtn" color="green" onClick={() => { navigate('/register') } }>Register</Button></>
            <Button name="loginBtn" sx={{backgroundColor: "#F29465", borderRadius:"20px"}} onClick={() => { navigate('/login') }}>Login</Button>
          </Box>
        </>
        )}               
        </>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default Header;