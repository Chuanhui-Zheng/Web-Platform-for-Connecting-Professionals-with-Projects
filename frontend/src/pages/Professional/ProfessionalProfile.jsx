import * as React from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import ProfileHeader from "../../components/ProfileHeader";
import styles from "../../styles/Professional/ProfessionalProfile.module.css"
import BasicChips from "../../components/Chip";
import ProjectCard from "../../components/Professional/Dashboard/ProjectCard";
import { Button } from '@mui/material';
import { apiGet } from '../../api';
import decodeJWT from "../../decodeJWT";

const ProfessionalProfile = () => {
    console.log("professional profile reached")
    const description = "HEllo i am jim, i am so passionaat aboutbaiosdfhoiehofihehofhaoei hfoiaheoihfoaisdhfhadsuibhfuiagsdbiuaioewfhaieohfoaie"
    const navigate = useNavigate();
    

    const [userId, setUserId] = React.useState();
    const [userType, setUserType] = React.useState('');

    React.useEffect(() => {
        const getToken = localStorage.getItem("token");
        console.log(getToken)
        if (getToken != null) {
            const tokenData = decodeJWT(getToken);
            setUserType(tokenData.userType)
            setUserId(tokenData.userId)
        }
       
    }, []);
    
      React.useEffect(() => {
        if (userId) {
            apiGet("/user/details/professional", `id=${userId}`)
                .then((data) => {
                    console.log(data);
                    if (!data.error) {
                        console.log("Profile fetched successfully.");
                    } else {
                        throw new Error("Get Profile Failed");
                    }
                })
                .catch(() => {
                    alert("Profile fetch failed.");
                });
        }
    }, [userId]);

    return (

        <>
        {ProfileHeader()}
        <Button name="editprofessionalprofile" 
            onClick={() => { navigate('/editprofessionalprofile') }} 
            sx={{ textTransform: 'none', ml:'10vw' }}
            variant="outlined">Edit Professional Profile</Button>
        <div className={styles.ProfessionalProfileContent}>
            <h1 className={styles.ProfessionalProfileBodyTitle}>Summary</h1>
            <div className={styles.ProfessionalProfileText}>
                {description}
            </div>
            <h1 className={styles.ProfessionalProfileBodyTitle}>Skills</h1>
            <div className={styles.ProfessionalProfileSkillsContainer}>
                <div className={styles.ProfessionalProfileSkill}>
                    <BasicChips content="hefasdf" />
                </div>
                <div className={styles.ProfessionalProfileSkill}>
                    <BasicChips content="hefasdf" />
                </div>
                <div className={styles.ProfessionalProfileSkill}>
                    <BasicChips content="hefasdf" />
                </div>
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