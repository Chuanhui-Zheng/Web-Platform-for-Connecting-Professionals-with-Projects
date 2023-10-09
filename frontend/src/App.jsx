import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

// import NavBar from './components/NavBar';
import Header from './components/Header';


import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import ProfessionalDashboard from "./pages/ProfessionalDashboard"
import CompanyDashboard from "./pages/CompanyDashboard"
import AllProjects from "./pages/AllProjects"
import AboutUs from "./pages/AboutUs"
import NotFound from "./pages/NotFound"
import ProfessionalProfile from './pages/Professional/ProfessionalProfile';
import CompanyProfile from './pages/Companies/CompanyProfile';
import ProjectDetail from './pages/ProjectDetail';
import ProjectPage from './pages/ProjectPage';
// import ProtectedRoute from "./components/ProtectedRoute"



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
    <BrowserRouter>
        {/* <NavBar /> */}
        <Header />
        {/* <br/> */}
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<RegisterAndLogout />} />
            <Route path="/companydashboard" element={<CompanyDashboard />} />
            <Route path="/prodashbaord" element={<ProfessionalDashboard />} />
            <Route path="/allprojects" element={<AllProjects />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="*" element={<NotFound />}></Route>
            <Route path="/proprofile" element={<ProfessionalProfile />} />
            <Route path="/companyprofile" element={<CompanyProfile />} />
            <Route path="/projectdetail/:projectID" element={<ProjectDetail />} />
            <Route path="/projectpage/:projectID" element={<ProjectPage />} />

        </Routes>
    </BrowserRouter>
  );
}

export default App;
