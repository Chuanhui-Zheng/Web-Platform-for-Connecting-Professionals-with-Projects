import * as React from 'react';
import styles from '../styles/ProfileHeader.module.css'
import { Link, useNavigate, Navigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CustomisedRating from './CustomisedRating'; 
import { AppBar, Box, Button, Typography, Toolbar, CssBaseline } from '@mui/material';
import decodeJWT from "../decodeJWT";
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import { apiGet } from '../api';

const ProfileHeader = ({userId, userType, refresh}) => {
    const navigate = useNavigate();
    const [token, setToken] = React.useState('');
    // const [userId, setUserId] = React.useState('');
    // const [userType, setUserType] = React.useState('');

    const [name, setNewName] = React.useState('');
    const [email, setNewEmail] = React.useState('');
    const [phoneNumber, setNewPhoneNumber] = React.useState('');
    const [website, setNewWebsite] = React.useState('');
    const [photo, setNewPhoto] = React.useState(null);

    React.useEffect(() => {
        // const token = localStorage.getItem("token");
        // const tokenData = decodeJWT(token);
        // setUserId(tokenData.userId);
        // setUserType(tokenData.userType);
        // setToken(token);
        console.log("edit proprofile profile header userId", userId)
        console.log("edit proprofile profile header userId", userType)
    }, []);

    React.useEffect(() => {
        if (userType === "company") {    
            apiGet("/user/details/company", `id=${userId}`)
                .then((data) => {
                    console.log(data);
                    if (!data.error) {
                        setNewName(data.companyName);
                        setNewEmail(data.companyEmail);
                        setNewPhoneNumber(data.companyPhoneNumber);
                        setNewWebsite(data.companyWebsite);
                        setNewPhoto(data.companyLogo);
                        // TODO:setNewCompanyRating(data.companyRating);
                        console.log("comp deatails:", data.companyName)
                        console.log("comp deatails2:", data.companyPhoneNumber)
                    } else {
                        throw new Error("Get Profile Failed");
                    }
                })
                .catch(() => {
                    alert("not valid.");
                });
        } else if (userType === "professional") {
            console.log("edit profile get details id: ", userId)
            console.log("edit profile get details usertype: ", userType)
            apiGet("/user/details/professional", `id=${userId}`)
                .then((data) => {
                    console.log(data);
                    if (!data.error) {
                        console.log("ProProfile fetched successfully.");
                        setNewName(data.professionalFullName);
                        setNewEmail(data.professionalEmail);
                        setNewPhoneNumber(data.professionalPhoneNumber);
                        setNewWebsite(data.professionalWebsite);
                        setNewPhoto(data.professionalPhoto);
                        console.log("prof deatails:", data.professionalFullName)
                        console.log("prof deatails2:", data.professionalPhoneNumber)
                    } else {
                        throw new Error("Get Profile Failed");
                    }
                })
                .catch(() => {
                    alert("Profile fetch failed1.");
                });
        }
    }, [token, refresh]);
    


    return (
        <div className={styles.ProfileHeaderBar}>
            <Avatar className={styles.ProfileHeaderProfilePic} src={photo} sx={{ bgcolor: deepOrange[500]}}/>
            {/* <AccountCircleIcon className={styles.ProfileHeaderProfilePic}/> */}
            <div className={styles.ProfileHeaderContent}>
                <div className={styles.ProfileHeaderNameAndRating}>
                    <h1 className={styles.ProfileHeaderName}>{name}</h1>
                    <div className={styles.ProfileHeaderRaitingBox}>
                        <CustomisedRating value={3}/>
                    </div>
                </div>
                
                <div className={styles.ProfileHeaderLinks}>
                    <Link to="/companydashboard" className={styles.ProfileHeaderLink}>{email}</Link>
                    <Link to="/companydashboard" className={styles.ProfileHeaderLink}>{website}</Link>
                    <Link to="/companydashboard" className={styles.ProfileHeaderLink}>{phoneNumber}</Link>
                </div>
            </div>
        </div>
    );
}

export default ProfileHeader;