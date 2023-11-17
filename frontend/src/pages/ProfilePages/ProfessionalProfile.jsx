import * as React from 'react';
import { Link, useNavigate, Navigate, useParams } from 'react-router-dom';
import ProfileHeader from "../../components/ProfileHeader";
import styles from "../../styles/Professional/ProfessionalProfile.module.css"
import BasicChips from "../../components/Chip";
import ProjectCard from "../../components/Professional/Dashboard/ProjectCard";
import { Box, Button, Divider, Typography } from '@mui/material';
import { apiGet } from '../../api';
import decodeJWT from "../../decodeJWT";
import { getProjects } from '../../helpers';
import Certificates from '../../components/CertficateCard';
import PaginationCards from '../../components/Pagination';
import { useProfile } from '../../ProfileContext';
import ProjectCard1 from '../../components/Professional/Dashboard/ProjectCard1';
import Grid from '@mui/material/Grid2';

const ProfessionalProfile = ( { userId } ) => {
    console.log("professional profile reached")
    const description = "HEllo i am jim, i am so passionaat aboutbaiosdfhoiehofihehofhaoei hfoiaheoihfoaisdhfhadsuibhfuiagsdbiuaioewfhaieohfoaie"
    const navigate = useNavigate();
    
    const [token, setToken] = React.useState();
    const [ownUserId, setOwnUserId] = React.useState();
    const [userType, setUserType] = React.useState('');
    const [ownProfile, setOwnProfile] = React.useState(true);

    const [professionalSkills, setProfessionalSkills] = React.useState([]);
    const [professionalDescription, setProfessionalDescription] = React.useState('');
    const [professionalEducation, setProfessionalEducation] = React.useState('');
    const [professionalQualifications, setProfessionalQualifications] = React.useState('');
    const [projects, setProjects] = React.useState([]);
    const [certificates, setCertificates] = React.useState([]);
    const [ratings, setRatings] = React.useState([]);
    const reloadProfile = useProfile();

    React.useEffect(() => {
        const getToken = localStorage.getItem("token");
        console.log(getToken)
        if (getToken != null) {
            const tokenData = decodeJWT(getToken);
            setUserType(tokenData.userType)
            setOwnUserId(tokenData.userId)
            setToken(getToken)
            console.log("token, usertype", tokenData.userType, tokenData.userId)
            if (tokenData.userId != userId) {
                setOwnProfile(false);
            }
        }
       
    }, []);
    
      React.useEffect(() => {
        console.log("in here", ownUserId, userType)
        if (ownUserId && userType) {
            console.log(`User ID: ${userId}, User Type: ${userType}`);
            console.log("calling get details api in profile page")
            async function fetchProjects() {
                const projectData = await getProjects(userId, '');
                setProjects(projectData);
            }
            fetchProjects()

            apiGet("/user/details/professional", `id=${userId}`)
                .then((data) => {
                    console.log(data);
                    if (!data.error) {
                        console.log("Profile fetched successfully.");
                        setProfessionalSkills(data.professionalSkills);
                        setProfessionalDescription(data.professionalDescription);
                        setProfessionalEducation(data.professionalEducation);
                        setProfessionalQualifications(data.professionalQualifications);
                        setRatings(data.professionalRatings);
                        console.log("fnished calling get details api in profile page")
                    } else {
                        throw new Error("Get Profile Failed");
                    }
                })
                .catch(() => {
                    alert("Profile fetch5 failed.");
            });
            
            apiGet("/profile/viewCertificate", `id=${userId}`)
            .then((data) => {
                console.log(data);
                if (!data.error) {
                    console.log("certs: ", data.professionalCertificates)
                    setCertificates(data.professionalCertificates)
                } else {
                    throw new Error("Get Cert Failed");
                }
            })
            .catch(() => {
                alert("Profile fetch6 failed.");
            });

        }
    }, [ownUserId, userType, reloadProfile]);
    return (

        <>
        <Box sx={{ width: '100%', minHeight: '1600px', bgcolor: '#F5F5F5',background: 'linear-gradient(to bottom, #F5F5F5, #F5F5F5)', borderRadius: '20px' }}>
        <ProfileHeader userId={userId} userType="professional" ownProfile={ownProfile}></ProfileHeader>
        <div className={styles.ProfessionalProfileContent}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mt:2, mb:1 }}>Summary</Typography>
            <div className={styles.ProfessionalProfileText}>
                {professionalDescription}
            </div>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mt:3, mb:1 }}>Skills</Typography>
            <div className={styles.ProfessionalProfileSkillsContainer}>
                {professionalSkills.map((skill, idx) => {
                    return (
                        <div key={idx} className={styles.ProfessionalProfileSkill}>
                            <BasicChips content={skill} />
                        </div>
                    )
                })}
            </div>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mt:3 }}>Projects</Typography>
            <br></br>
            {projects.length > 0 ? (
                    <Grid container spacing={2} sx ={{flexWrap: "wrap"}}>
                        {projects.map((project, idx) => (
                            <Grid item size={5} key={idx}>
                                <ProjectCard1 project={project} />
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <div > No Projects Listed. Apply for a Project!</div>
                )}
            <Typography variant="h5" sx={{ fontWeight: 'bold', mt:3,mb:1  }}>Certificates</Typography>
            {certificates.length > 0 ? (
                <Certificates certificates={certificates} ownProfile={ownProfile}></Certificates>
            ) : (
                <div> No Certifications Available.</div>
            )}
            <Typography variant="h5" sx={{ fontWeight: 'bold', mt:3, mb:1 }}>Reviews</Typography>
            {console.log(ratings)}
            {ratings.length > 0 ? (
                <PaginationCards reviews={ratings} type="professional" ></PaginationCards>
            ) : (
                <div> No Reviews Available.</div>
            )}
        </div>
        </Box>
        </>
    );
}

export default ProfessionalProfile;