import * as React from 'react';
import { AppBar, Box, Button, Typography, Toolbar, CssBaseline } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Header() {
    console.log('header')
    const navigate = useNavigate();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <CssBaseline />
            <AppBar position="sticky" sx={{backgroundColor: "#344649"}}>
            <Toolbar sx={{justifyContent: "space-between"}}>
            <Typography
                variant="h5"
                onClick={() => { navigate('/') }}
            >
                ProjectOr
            </Typography>
            {/* { localStorage.getItem('token') ? ( */} 
            <>
            <Box>
                <Button name="companyDashboard" color="inherit" onClick={() => { navigate('companydashboard') }} sx={{ textTransform: 'none' }}>Company Dashboard</Button>
                <Button name="proDashbaord" color="inherit" onClick={() => { navigate('prodashbaord') }} sx={{ textTransform: 'none' }}>Professional Dashboard</Button>
                <Button name="allProjects" color="inherit" onClick={() => { navigate('allprojects') }} sx={{ textTransform: 'none' }}>Browse Projects</Button>
                <Button name="aboutus" color="inherit" onClick={() => { navigate('aboutus') }} sx={{ textTransform: 'none' }}>About Us</Button>

            </Box>
            
                {/* <Button name="logoutBtn" color="inherit" onClick={logout}>Logout</Button> */}
            {/* </>) : ( */}
            {/* <> */}
            <Box>
                <><Button name="registerBtn" color="green" onClick={() => { navigate('register') } }>Register</Button></>
                <Button name="loginBtn" sx={{backgroundColor: "#F29465"}} onClick={() => { navigate('login') } }>Login</Button>
            </Box>
                </>
                {/* )} */}
            </Toolbar>
        </AppBar>
        </Box>
    );
}

export default Header;