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
import { deepOrange } from '@mui/material/colors';
import decodeJWT from "../decodeJWT";

function Header() {
    const navigate = useNavigate();
    const [token, setToken] = React.useState(localStorage.getItem("token"));
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [userType, setUserType] = React.useState('')
    
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    React.useEffect(() => {
        setInterval(() => {
            const glob = localStorage.getItem("token");
            setToken(glob);
        }, [])
        // const glob = localStorage.getItem(ACCESS_TOKEN);
        // setToken(glob);
    }, 5000);

    React.useEffect(() => {
        const token = localStorage.getItem("token");
        if (token != null) {
            const tokenData = decodeJWT(token);
            setUserType(tokenData.userType)
        }
      }, []);

    function logout() {
        localStorage.clear()
        navigate('/')
        return <Navigate to="/" />
    }

    function viewProfile() {
        if (userType === "company") {
            navigate("/companyprofile");
        } else if (userType === "professional") {
            navigate("/proprofile");
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
                <Button name="companyDashboard" color="inherit" onClick={() => { navigate('/companydashboard') }} sx={{ textTransform: 'none' }}>Company Dashboard</Button>
                <Button name="proDashbaord" color="inherit" onClick={() => { navigate('/prodashbaord') }} sx={{ textTransform: 'none' }}>Professional Dashboard</Button>
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
                <><Button name="notifBtn" color="green"> <NotificationsNoneIcon></NotificationsNoneIcon> </Button></>
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar sx={{ bgcolor: deepOrange[500], width: 32, height: 32 }} />
                </IconButton>
            </Box>
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

export default Header;