import * as React from 'react';
import { Link, useNavigate, Navigate, useParams } from 'react-router-dom';
import ProfileHeader from "../../components/ProfileHeader";
import styles from "../../styles/Professional/ProfessionalProfile.module.css"
import ProjectCard from "../../components/Professional/Dashboard/ProjectCard";
import { AppBar, Box, Button, Typography, Toolbar, CssBaseline, Divider } from '@mui/material';
import { apiGet } from '../../api';
import decodeJWT from "../../decodeJWT";
import { getProjects } from '../../helpers';
import { useProfile } from '../../ProfileContext';

const CompanyProfile = ({userId}) => {
    console.log("company profile reached")
    const navigate = useNavigate();
    // const [token, setToken] = React.useState(null);
    const [userType, setUserType] = React.useState('');
    const [ownUserId, setOwnUserId] = React.useState('');
    const [ownProfile, setOwnProfile] = React.useState(true);
    const [projects, setProjects] = React.useState([]);
    const [avgRating, setAvgRating] = React.useState('');

    const [companyDescription, setNewCompanyDescription] = React.useState(true);
    const reloadProfile = useProfile();

    React.useEffect(() => {
        const getToken = localStorage.getItem("token");
        console.log(getToken)
        if (getToken != null) {
            // setToken(token);
            const tokenData = decodeJWT(getToken);
            setOwnUserId(tokenData.userId);
            setUserType(tokenData.userType);
            if (tokenData.userId != userId) {
                setOwnProfile(false);
            }
        }
    }, []);

    React.useEffect(() => {
        if (ownUserId && userType) {
            console.log(`User ID: ${ownUserId}, User Type: ${userType}`);
            
            async function fetchProjects() {
                const projectData = await getProjects(userId, '');
                setProjects(projectData);
            }
            fetchProjects()

            apiGet("/user/details/company", `id=${userId}`)
                .then((data) => {
                    if (!data.error) {
                        setNewCompanyDescription(data.companyDescription);
                        setAvgRating(data.companyRating);
                        console.log("Profile fetched successfully.");
                    } else {
                        throw new Error("Get Profile Failed");
                    }
                })
                .catch(() => {
                    alert("not valid.");
                });
        }
    }, [ownUserId, userType, reloadProfile]);

    return (

        <>
        <ProfileHeader userId={userId} userType="company" ownProfile={ownProfile}></ProfileHeader>
        <div className={styles.ProfessionalProfileContent}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mt:2, mb:1 }}>Summary</Typography>
            <div className={styles.ProfessionalProfileText}>
                {companyDescription}
            </div>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mt:3 }}>Projects</Typography>
            <div class={styles.ProfessionalProfileProjectList}>
                {projects.map((project, idx) => (
                    <ProjectCard
                        key={idx}
                        projectName={project.projectName}
                        projectDescription={project.projectDescription}
                        projectId={project.projectId}
                    />
                ))}
            </div>
        </div>
        </>
    );
}

export default CompanyProfile;