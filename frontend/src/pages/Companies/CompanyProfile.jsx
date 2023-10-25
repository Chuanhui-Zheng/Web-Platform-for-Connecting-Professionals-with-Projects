import * as React from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import ProfileHeader from "../../components/ProfileHeader";
import styles from "../../styles/Professional/ProfessionalProfile.module.css"
import ProjectCard from "../../components/Professional/Dashboard/ProjectCard";
import { AppBar, Box, Button, Typography, Toolbar, CssBaseline } from '@mui/material';
import { apiGet } from '../../api';
import decodeJWT from "../../decodeJWT";


const CompanyProfile = () => {
    console.log("company profile reached")
    const description = "HEllo i am jim, i am so passionaat aboutbaiosdfhoiehofihehofhaoei hfoiaheoihfoaisdhfhadsuibhfuiagsdbiuaioewfhaieohfoaie"
    const navigate = useNavigate();
    const [userType, setUserType] = React.useState('');
    const [userId, setUserId] = React.useState('');

    React.useEffect(() => {
        const getToken = localStorage.getItem("token");
        console.log(getToken)
        if (getToken != null) {
            const tokenData = decodeJWT(getToken);
            setUserId(tokenData.userId)
            setUserType(tokenData.userType)
        }
    }, []);

    React.useEffect(() => {
        if (userId && userType) {
            console.log(`User ID: ${userId}, User Type: ${userType}`);
    
            apiGet("/user/details/company", `id=${userId}`)
                .then((data) => {
                    console.log(data);
                    if (!data.error) {
                        console.log("worked");
                        console.log(data.companyEmail);
                    } else {
                        throw new Error("Get Profile Failed");
                    }
                })
                .catch(() => {
                    alert("not valid.");
                });
        }
    }, [userId, userType]);

    return (

        <>
        {ProfileHeader()}
        <div className={styles.ProfileHeaderContent}>
            <Button name="editcompanyprofile" 
                variant="outlined"
                onClick={() => { navigate('/editcompanyprofile') }} 
                sx={{ textTransform: 'none', ml:'10vw' }}>Edit Company Profile</Button> 
        </div>
        
        <div className={styles.ProfessionalProfileContent}>
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

export default CompanyProfile;