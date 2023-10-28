import * as React from 'react';
import { Link, useNavigate, Navigate, useParams } from 'react-router-dom';
import ProfileHeader from "../../components/ProfileHeader";
import styles from "../../styles/Professional/ProfessionalProfile.module.css"
import ProjectCard from "../../components/Professional/Dashboard/ProjectCard";
import { AppBar, Box, Button, Typography, Toolbar, CssBaseline } from '@mui/material';
import { apiGet } from '../../api';
import decodeJWT from "../../decodeJWT";


const CompanyProfile = ({userId}) => {
    console.log("company profile reached")
    const description = "HEllo i am jim, i am so passionaat aboutbaiosdfhoiehofihehofhaoei hfoiaheoihfoaisdhfhadsuibhfuiagsdbiuaioewfhaieohfoaie"
    const navigate = useNavigate();
    // const [token, setToken] = React.useState(null);
    const [userType, setUserType] = React.useState('');
    const [ownUserId, setOwnUserId] = React.useState('');
    const [ownProfile, setOwnProfile] = React.useState(true);

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
    
            apiGet("/user/details/company", `id=${userId}`)
                .then((data) => {
                    console.log(data);
                    if (!data.error) {
                        // setNewCompanyDescription(data.companyDescription);
                        console.log("Profile fetched successfully.");
                        console.log(data.companyLogo);
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
        {/* {ProfileHeader()} */}
        {/* <img src={companyLogo}/> */}
        <div className={styles.ProfileHeaderContent}>
            {ownProfile ? <Button name="editcompanyprofile" 
                variant="outlined"
                onClick={() => { navigate(`/profile/:${userId}/edit`) }} 
                sx={{ textTransform: 'none', ml:'10vw' }}>Edit Company Profile</Button> :<></> }
            
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