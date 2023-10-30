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
// import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import NotificationImportantOutlinedIcon from '@mui/icons-material/NotificationImportantOutlined';
import { deepOrange } from '@mui/material/colors';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { styled } from '@mui/system';


import decodeJWT from "../decodeJWT";
import { apiGet } from '../api';
import { useHeader } from '../HeaderContext';

function Header() {
    console.log("Render Header")
    const navigate = useNavigate();
    const [token, setToken] = React.useState(localStorage.getItem("token"));
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchor, setAnchor] = React.useState(null);
    const [notifications, setNotifs] = React.useState(null);
    const [newNotif, setNewNotifs] = React.useState(false);
    const [userType, setUserType] = React.useState('');
    const [userId, setUserId] = React.useState();
    const [photo, setNewPhoto] = React.useState(null);
    const { reloadHeader } = useHeader();
    
    const open = Boolean(anchorEl);
    const openNotif = Boolean(anchor);
    const id = open ? 'simple-popper' : undefined;

    // Profile menu handerls
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
    const handleNotifs2 = (event) => {
        setAnchor(null);
    };
    React.useEffect(() => {
        setInterval(() => {
            const glob = localStorage.getItem("token");
            setToken(glob);
        }, [])
    }, 5000);

    React.useEffect(() => {
        console.log('Header re-rendered or updated due to state change!');
        const token = localStorage.getItem("token");
        if (token != null) {
            const tokenData = decodeJWT(token);
            setUserType(tokenData.userType)
            setUserId(tokenData.userId)
            console.log("boing", tokenData.userType)
            console.log("SSS", tokenData.userId)
            console.log("boisdsdng", userType)

            if (tokenData.userType === 'professional') {
                console.log('AAAAAAAAA')
                apiGet('/notifications/get', `professionalId=${tokenData.userId}`)
                .then(data => {
                    if (!data.error) {
                        setNotifs(data);
                        console.log("notif details:", data)
                        console.log("notif old details:", notifications)
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
                
            }
            
            apiGet(`/user/details/${tokenData.userType}`, `id=${tokenData.userId}`)
                    .then((data) => {
                        console.log(data);
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


    function logout() {
        localStorage.clear()
        navigate('/')
        return <Navigate to="/" />
    }

    function viewProfile() {
        const token1 = localStorage.getItem("token");
        if (token1 != null) {
            const tokenData = decodeJWT(token1);
            console.log("navigating to id", tokenData.userId)
            navigate(`/profile/${tokenData.userId}`);
        }
    }
    
    return (
        <Box sx={{backgroundColor: 'pink'}}>
            <CssBaseline />
            <AppBar position="sticky" sx={{backgroundColor: "#344649"}}>
            <Toolbar sx={{justifyContent: "space-between",  "@media (min-width: 0px)": { paddingRight: "25px", paddingLeft: "25px" },}}>
            <Typography
                variant="h5"
                onClick={() => { navigate('/') }}
            >
                ProJector
            </Typography>
            {/* { localStorage.getItem('token') ? ( */} 
            <>
            <Box>
                {userType === 'company' ?
                    <Button name="companyDashboard" color="inherit" onClick={() => { navigate('/companydashboard') }} sx={{ textTransform: 'none' }}>Company Dashboard</Button>
                : userType ===  'professional' ?
                     <Button name="proDashbaord" color="inherit" onClick={() => { navigate('/prodashbaord') }} sx={{ textTransform: 'none' }}>Professional Dashboard</Button>: <Box></Box>}
                <Button name="allProjects" color="inherit" onClick={() => { navigate('/allprojects') }} sx={{ textTransform: 'none' }}>Browse Projects</Button>
                <Button name="aboutus" color="inherit" onClick={() => { navigate('/aboutus') }} sx={{ textTransform: 'none' }}>About Us</Button>
                {/* <Button name="editprofessionalprofile" color="inherit" onClick={() => { navigate('editprofessionalprofile') }} sx={{ textTransform: 'none' }}>Edit Professional Profile</Button>
                <Button name="editcompanyprofile" color="inherit" onClick={() => { navigate('editcompanyprofile') }} sx={{ textTransform: 'none' }}>Edit Company Profile</Button> */}
            </Box>
            
                {/* <Button name="logoutBtn" color="inherit" onClick={logout}>Logout</Button> */}
            {/* </>) : ( */}
            {/* <> */}
            {token ?  (<>
            <Box>
                {/* <BasePopup sx={{ position: 'relative' }} id={id} open={openNotif} anchor={anchor}>
                <PopupBody  disablePortal>The content of the Popup.</PopupBody>
            </BasePopup> */}
                <><IconButton
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
                    {/* {photo ? <Avatar src={photo} sx={{ bgcolor: deepOrange[500], width: 32, height: 32 }} /> : <></>} */}
                    <Avatar src={photo} sx={{ bgcolor: deepOrange[500], width: 32, height: 32 }} />
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
                {console.log(notifications)}
                {console.log(newNotif)}
                {notifications === null ? <Box>Currently No Notifications! Check back Later! C:</Box>: <Box>
                 {notifications.map((notif, idx) => (
                    <MenuItem key={idx}>
                        <Box sx={{display:'flex', flexDirection:'column', fontSize:'13px'}}>
                            {notif.professionalNotificationMessage}
                            <Box sx={{fontSize:'12px'}}>{notif.professionalNotificationTime} -
                            {notif.professionalNotificationDate}</Box>
                        </Box>
                    </MenuItem>
                 ))}
                <Divider /></Box>}
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
                <MenuItem onClick={viewProfile}>
                 Profile
                </MenuItem>
                <Divider />
                {/* <MenuItem onClick={handleClose}>
                <ListItemIcon>
                    <PersonAdd fontSize="small" />
                </ListItemIcon>
                Add another account
                </MenuItem> */}
                <MenuItem onClick={handleClose}>
                <ListItemIcon>
                    <Settings fontSize="small" />
                </ListItemIcon>
                Settings
                </MenuItem>
                <MenuItem onClick={logout}>
                <ListItemIcon onClick={logout}>
                    <Logout fontSize="small" />
                </ListItemIcon >
                Logout
                </MenuItem>
            </Menu>
            </>) : (<>
                <Box>
                    <><Button name="registerBtn" color="green" onClick={() => { navigate('register') } }>Register</Button></>
                    <Button name="loginBtn" sx={{backgroundColor: "#F29465"}} onClick={() => { navigate('login') }}>Login</Button>
                </Box>
            </>
            )}               </>
            </Toolbar>
        </AppBar>
        </Box>
    );
}

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};
const PopupBody = styled('div')(
  ({ theme }) => `
  width: max-content;
  padding: 12px 16px;
  margin: 8px;
  border-radius: 8px;
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  box-shadow: ${
    theme.palette.mode === 'dark'
      ? `0px 4px 8px rgb(0 0 0 / 0.7)`
      : `0px 4px 8px rgb(0 0 0 / 0.1)`
  };
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  z-index: 1;
`,
);

export default Header;