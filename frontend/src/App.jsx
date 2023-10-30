import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Header from './components/Header';


import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import ProfessionalDashboard from "./pages/ProfessionalDashboard"
import CompanyDashboard from "./pages/CompanyDashboard"
import AllProjects from "./pages/AllProjects"
import AboutUs from "./pages/AboutUs"
import NotFound from "./pages/NotFound"
import CreateProject from './pages/CreateProject';
import ProjectDetail from './pages/ProjectDetail';
import ProjectPage from './pages/ProjectPage';
import ProjectApplicantList from './pages/ProjectApplicantList';
import ProfilePage from './pages/ProfilePage';
// import ProtectedRoute from "./components/ProtectedRoute";
import EditProfilePage from './pages/EditProfilePage';
import EditProject from './pages/EditProject';


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
            <Route path="/companydashboard/createproject" element={<CreateProject />} />
            <Route path="/prodashbaord" element={<ProfessionalDashboard />} />
            <Route path="/profile/:userId/edit" element={<EditProfilePage />} />
            <Route path="/allprojects" element={<AllProjects />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="*" element={<NotFound />}></Route>
            <Route path="/profile/:userId" element={<ProfilePage />} />
            <Route path="/projectdetail/:projectID" element={<ProjectDetail />} />
            <Route path="/projectpage/:projectID" element={<ProjectPage />} />
            <Route path="/projectpage/:projectID/edit" element={<EditProject />} />
            <Route path="/projectCandidateList" element={<ProjectCandidateList />} />
            <Route path="/project/:projectId/applicants" element={<ProjectApplicantList />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
