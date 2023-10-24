import * as React from 'react';
import styles from '../styles/ProfileHeader.module.css'
import { Link, useNavigate, Navigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CustomisedRating from './CustomisedRating'; 
import { AppBar, Box, Button, Typography, Toolbar, CssBaseline } from '@mui/material';
import decodeJWT from "../decodeJWT";

const ProfileHeader  = () => {
    const navigate = useNavigate();
    const [userType, setUserType] = React.useState('')

    React.useEffect(() => {
        const token = localStorage.getItem("token");
        const tokenData = decodeJWT(token);
        setUserType(tokenData.userType)
      }, []);


    return (
        <div className={styles.ProfileHeaderBar}>
            <AccountCircleIcon className={styles.ProfileHeaderProfilePic}/>
            <div className={styles.ProfileHeaderContent}>
                <div className={styles.ProfileHeaderNameAndRating}>
                    <h1 className={styles.ProfileHeaderName}>Profile Name</h1>
                    <div className={styles.ProfileHeaderRaitingBox}>
                        <CustomisedRating value={3}/>
                    </div>
                </div>
                
                <div className={styles.ProfileHeaderLinks}>
                    <Link to="/companydashboard" className={styles.ProfileHeaderLink}>Email</Link>
                    <Link to="/companydashboard" className={styles.ProfileHeaderLink}>Linkedin</Link>
                    <Link to="/companydashboard" className={styles.ProfileHeaderLink}>Other link</Link>
                    {userType === "professional" ? <Button name="editprofessionalprofile" 
                      onClick={() => { navigate('/editprofessionalprofile') }} 
                      sx={{ textTransform: 'none' }} 
                      variant="outlined">Edit Professional Profile</Button> 
                    : <Button name="editcompanyprofile" 
                        variant="outlined"
                        onClick={() => { navigate('/editcompanyprofile') }} 
                        sx={{ textTransform: 'none' }}>Edit Company Profile</Button>}
                </div>
            </div>
        </div>
    );
}

export default ProfileHeader;