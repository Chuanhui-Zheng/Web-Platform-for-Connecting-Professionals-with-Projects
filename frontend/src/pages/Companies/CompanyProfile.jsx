import * as React from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import ProfileHeader from "../../components/ProfileHeader";
import styles from "../../styles/Professional/ProfessionalProfile.module.css"
import ProjectCard from "../../components/Professional/Dashboard/ProjectCard";
import { AppBar, Box, Button, Typography, Toolbar, CssBaseline } from '@mui/material';
import { apiGet } from '../../api';
import decodeJWT from "../../decodeJWT";
import img from '../dog.jpeg'


const CompanyProfile = () => {
    console.log("company profile reached")
    const description = "HEllo i am jim, i am so passionaat aboutbaiosdfhoiehofihehofhaoei hfoiaheoihfoaisdhfhadsuibhfuiagsdbiuaioewfhaieohfoaie"
    const navigate = useNavigate();
    const [userId, setUserId] = React.useState();
    const [userType, setUserType] = React.useState('');
    const [newImage, setNewImage] = React.useState(null);

    React.useEffect(() => {
        const getToken = localStorage.getItem("token");
        console.log(getToken)
        if (getToken != null) {
            const tokenData = decodeJWT(getToken);
            setUserType(tokenData.userType)
            
            setUserId(parseInt(tokenData.userId))
            console.log(tokenData.userId)
        
            apiGet("/user/details/company", `id=${tokenData.userId}` 
            ).then((data) =>{
                console.log(data)
                if (!data.error) {
                    // setNewImage(data.companyLogo)
                    console.log(data.companyLogo)
                    console.log("worked");
                } else {
                    throw new Error("Get Profile Failed");
                }
            })
            .catch(() => {
                alert("not valid.")
                });
            
        }
       
      }, []);

    return (

        <>
        {ProfileHeader()}
        <img src={img}/>
        <img src={newImage}/>
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