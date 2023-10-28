import * as React from 'react';
import { Link, useNavigate, Navigate, useParams } from 'react-router-dom';
import ProfileHeader from "../../components/ProfileHeader";
import styles from "../../styles/Professional/ProfessionalProfile.module.css"
import BasicChips from "../../components/Chip";
import ProjectCard from "../../components/Professional/Dashboard/ProjectCard";
import { Button } from '@mui/material';
import { apiGet } from '../../api';
import decodeJWT from "../../decodeJWT";

const ProfessionalProfile = ( { userId } ) => {
    console.log("professional profile reached")
    const description = "HEllo i am jim, i am so passionaat aboutbaiosdfhoiehofihehofhaoei hfoiaheoihfoaisdhfhadsuibhfuiagsdbiuaioewfhaieohfoaie"
    const navigate = useNavigate();
    

    const [ownUserId, setOwnUserId] = React.useState();
    const [userType, setUserType] = React.useState('');
    const [ownProfile, setOwnProfile] = React.useState(true);

    const [professionalSkills, setProfessionalSkills] = React.useState([]);
    const [professionalDescription, setProfessionalDescription] = React.useState('');
    const [professionalEducation, setProfessionalEducation] = React.useState('');
    const [professionalQualifications, setProfessionalQualifications] = React.useState('');

    React.useEffect(() => {
        const getToken = localStorage.getItem("token");
        console.log(getToken)
        if (getToken != null) {
            const tokenData = decodeJWT(getToken);
            setUserType(tokenData.userType)
            setOwnUserId(tokenData.userId)
            if (tokenData.userId != userId) {
                setOwnProfile(false);
            }
        }
       
    }, []);
    
      React.useEffect(() => {
        if (ownUserId && userType) {
            console.log(`User ID: ${userId}, User Type: ${userType}`);
            console.log("calling get details api in profile page")
            apiGet("/user/details/professional", `id=${userId}`)
                .then((data) => {
                    console.log(data);
                    if (!data.error) {
                        console.log("Profile fetched successfully.");
                        setProfessionalSkills(data.professionalSkills);
                        setProfessionalDescription(data.professionalDescription);
                        setProfessionalEducation(data.professionalEducation);
                        setProfessionalQualifications(data.professionalQualifications);
                        console.log("fnished calling get details api in profile page")
                    } else {
                        throw new Error("Get Profile Failed");
                    }
                })
                .catch(() => {
                    alert("Profile fetch5 failed.");
                });
                
        }
    }, [ownUserId, userType]);

    return (

        <>
        <ProfileHeader userId={userId} userType="professional" ></ProfileHeader>
        {/* <img src={professionalPhoto}/> */}
        {ownProfile ? <Button name="editprofessionalprofile" 
            onClick={() => { navigate(`/profile/:${userId}/edit`) }} 
            sx={{ textTransform: 'none', ml:'10vw' }}
            variant="outlined">Edit Professional Profile</Button> : <></>}
        
        <div className={styles.ProfessionalProfileContent}>
            <h1 className={styles.ProfessionalProfileBodyTitle}>Summary</h1>
            <div className={styles.ProfessionalProfileText}>
                {professionalDescription}
            </div>
            <h1 className={styles.ProfessionalProfileBodyTitle}>Skills</h1>
            <div className={styles.ProfessionalProfileSkillsContainer}>
                {professionalSkills.map((skill, idx) => {
                    return (
                        <div key={idx} className={styles.ProfessionalProfileSkill}>
                            <BasicChips content={skill} />
                        </div>
                    )
                })}
            </div>
            <h1 className={styles.ProfessionalProfileBodyTitle}>Projects</h1>
            <div class={styles.ProfessionalProfileProjectList}>
                {ProjectCard("a", "aasdasdasdasdasdasdugadsfiuhadufhadsuhfuiahdsuifhaiusdhfuasdfadssfsasdfasdasdfadsfaidafdsfadsfasdasdfadsffasd")}
                {ProjectCard("a", "aasdasdasdasdasdasdugadsfiuhadufhadsuhfuiahdsuifhaiusdhfuasdfadssfsasdfasdasdfadsfaidafdsfadsfasdasdfadsffasd")}
                {ProjectCard("a", "aasdasdasdasdasdasdugadsfiuhadufhadsuhfuiahdsuifhaiusdhfuasdfadssfsasdfasdasdfadsfaidafdsfadsfasdasdfadsffasd")}
            </div>
        </div>
        </>
    );
}

export default ProfessionalProfile;