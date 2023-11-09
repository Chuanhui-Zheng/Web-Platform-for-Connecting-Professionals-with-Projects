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
import ProjectPage from './pages/ProjectPages/ProjectPage';
import ProjectApplicantList from './pages/ProjectPages/ProjectApplicantList';
import ProfilePage from './pages/ProfilePages/ProfilePage';
// import ProtectedRoute from "./components/ProtectedRoute";
import EditProfilePage from './pages/ProfilePages/EditProfilePage';
import EditProject from './pages/ProjectPages/EditProject';
import RateProfessional from './pages/RatingPages/RateProfessional';
import Dashboard from './pages/Dashboard/Dashboard';

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
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/companydashboard/createproject" element={<CreateProject />} />
            <Route path="/profile/:userId/edit" element={<EditProfilePage />} />
            <Route path="/allprojects" element={<AllProjects />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="*" element={<NotFound />}></Route>
            <Route path="/profile/:userId" element={<ProfilePage />} />
            <Route path="/projectdetail/:projectID" element={<ProjectDetail />} />
            <Route path="/projectpage/:projectID" element={<ProjectPage />} />
            <Route path="/projectpage/:projectID/edit" element={<EditProject />} />
            <Route path="/project/:projectId/rate" element={<RateProfessional />} />
            {/* <Route path="/project/rate" element={<RateProfessional />} /> */}
            <Route path="/project/:projectId/applicants" element={<ProjectApplicantList />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;