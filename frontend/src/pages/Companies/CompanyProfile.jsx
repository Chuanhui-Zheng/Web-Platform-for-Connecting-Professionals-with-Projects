import * as React from 'react';
import { Link, useNavigate, Navigate, useParams } from 'react-router-dom';
import ProfileHeader from "../../components/ProfileHeader";
import styles from "../../styles/Professional/ProfessionalProfile.module.css"
import ProjectCard from "../../components/Professional/Dashboard/ProjectCard";
import { AppBar, Box, Button, Typography, Toolbar, CssBaseline } from '@mui/material';
import { apiGet } from '../../api';
import decodeJWT from "../../decodeJWT";
import { getProjects } from '../../helpers';


const CompanyProfile = ({userId}) => {
    console.log("company profile reached")
    const navigate = useNavigate();
    // const [token, setToken] = React.useState(null);
    const [userType, setUserType] = React.useState('');
    const [ownUserId, setOwnUserId] = React.useState('');
    const [ownProfile, setOwnProfile] = React.useState(true);
    const [projects, setProjects] = React.useState([]);

    const [companyDescription, setNewCompanyDescription] = React.useState(true);

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
                        console.log("Profile fetched successfully.");
                    } else {
                        throw new Error("Get Profile Failed");
                    }
                })
                .catch(() => {
                    alert("not valid.");
                });
        }
    }, [ownUserId, userType]);

    return (

        <>
        <ProfileHeader userId={userId} userType="company" ></ProfileHeader>
        <div className={styles.ProfileHeaderContent}>
            {ownProfile ? <Button name="editcompanyprofile" 
                variant="outlined"
                onClick={() => { navigate(`/profile/:${userId}/edit`) }} 
                sx={{ textTransform: 'none', ml:'10vw' }}>Edit Company Profile</Button> :<></> }
            
        </div>
        
        <div className={styles.ProfessionalProfileContent}>
            <h1 className={styles.ProfessionalProfileBodyTitle}>Summary</h1>
            <div className={styles.ProfessionalProfileText}>
                {companyDescription}
            </div>
            <h1 className={styles.ProfessionalProfileBodyTitle}>Projects</h1>
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