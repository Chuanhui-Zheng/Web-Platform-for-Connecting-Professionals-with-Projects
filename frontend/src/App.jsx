import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Header from './components/Header';


import Login from "./pages/Auth/Login"
import Register from "./pages/Auth/Register"
import Home from "./pages/Home"
import AllProjects from "./pages/ProjectPages/AllProjects"
import AboutUs from "./pages/AboutUs"
import NotFound from "./pages/ErrorPages/NotFound"
import CreateProject from './pages/ProjectPages/CreateProject';
import ProjectDetail from './pages/ProjectPages/ProjectDetail';
import ProfilePage from './pages/ProfilePages/ProfilePage';
import RateProfessional from './pages/RatingPages/RateProfessional';
import Dashboard from './pages/Dashboard/Dashboard';
import ReviewPage from "./pages/RatingPages/ReviewPage";
import { PageContainer } from '@toolpad/core/PageContainer';
import './styles/App.css';
import { createGlobalStyle } from 'styled-components';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const theme = createTheme({  
  typography: {
    fontFamily: 
      '"Poppins", sans-serif',
  },
});

function Logout() {
    localStorage.clear()
    return <Navigate to="/" />
}

function RegisterAndLogout() {
    localStorage.clear()
    return <Register />
}

function App() {
  return (
    <ThemeProvider theme={theme}>
    <BrowserRouter>
        <Header />
        <PageContainer 
          className="container" 
          maxWidth={false} 
          sx={{
            width: "100%", 
            height:"calc(100vh - 80px)",
            margin: "0px", 
            paddingRight: { xs: "16px", sm: "25px", md: "60px" }, 
            paddingLeft: { xs: "16px", sm: "25px", md: "60px" },
            paddingTop: { xs: "16px", sm: "25px", md: "60px" },
            // backgroundColor: "white"
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<RegisterAndLogout />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/createproject" element={<CreateProject />} />
            <Route path="/allprojects" element={<AllProjects />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="*" element={<NotFound />}></Route>
            <Route path="/profile/:userId" element={<ProfilePage />} />
            <Route path="/projectdetail/:projectID" element={<ProjectDetail />} />
            <Route path="/project/:projectId/rate" element={<ReviewPage />} />
            {/* <Route path="/project/rate" element={<RateProfessional />} /> */}
          </Routes>
        </PageContainer>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;