import * as React from 'react';
import styles from '../styles/ProfileHeader.module.css'
import { Link, useNavigate, Navigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CustomisedRating from './CustomisedRating'; 
import { AppBar, Box, Button, Typography, Toolbar, CssBaseline, Divider } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import decodeJWT from "../decodeJWT";
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import { apiGet } from '../api';
import DynamicFormDialog from './FormDialog';
import { useProfile } from '../ProfileContext';

const ProfileHeader = ({userId, userType, ownProfile, refresh}) => {
    const navigate = useNavigate();
    const [token, setToken] = React.useState('');
    // const [userId, setUserId] = React.useState('');
    // const [userType, setUserType] = React.useState('');

    const [name, setNewName] = React.useState('');
    const [email, setNewEmail] = React.useState('');
    const [phoneNumber, setNewPhoneNumber] = React.useState('');
    const [website, setNewWebsite] = React.useState('');
    const [photo, setNewPhoto] = React.useState(null);
    const [isProfessional, setIsProfessional] = React.useState(false);
    const [avgRating, setAvgRating] = React.useState('');
    const [numRatings, setNumRatings] = React.useState('');

    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const reloadProfile = useProfile();

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
                    } else {
                        throw new Error("Get Profile Failed");
                    }
                })
                .catch(() => {
                    alert("not valid.");
                });
        } else if (userType === "professional") {
            setIsProfessional(true);
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
                        setAvgRating(data.professionalAvgRating.toFixed(1));
                        setNumRatings(Object.keys(data.professionalRatings).length)
                    } else {
                        throw new Error("Get Profile Failed");
                    }
                })
                .catch(() => {
                    alert("Profile fetch failed1.");
                });
        }
    }, [token, refresh, reloadProfile]);
    
    const handleOpenDialog = () => {
        setIsDialogOpen(true);
      };
    
    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };
    
    const formConfigProfessional = [
        { type: 'text', label: 'Full Name', name: 'professionalFullName' },
        { type: 'text', label: 'Password', name: 'professionalPassword' },
        { type: 'text', label: 'Phone Number', name: 'professionalPhoneNumber' },
        { type: 'textarea', label: 'Tell us About Yourself', name: 'professionalDescription' },
        { type: 'text', label: 'Qualifications', name: 'professionalQualifications' },
        { type: 'text', label: 'Education', name: 'professionalEducation' },
        { type: 'text', label: 'Website', name: 'professionalWebsite' },
        { type: 'file', label: 'Profile Photo', name: 'professionalPhoto' },
        { type: 'multiselect', label: 'Skills', name: 'professionalSkills'},
    ];

    const formConfigCompany = [
        { type: 'text', label: 'Company Name', name: 'companyName' },
        { type: 'text', label: 'Password', name: 'companyPassword' },
        { type: 'text', label: 'Phone Number', name: 'companyPhoneNumber' },
        { type: 'text', label: 'Company Website', name: 'companyWebsite' },
        { type: 'textarea', label: 'Tell Us About Yourself', name: 'companyDescription' },
        { type: 'file', label: 'Company Logo', name: 'companyLogo' },
    ];

    return (
        <div className={styles.Profile}> 
            <div className={styles.ProfileHeaderBar}>
                <div className={styles.ProfileBanner}></div>

                <div className={styles.ProfilePicAndEdit}>
                    <Avatar className={styles.ProfileHeaderProfilePic} src={photo} sx={{ bgcolor: deepOrange[500], width: '120px', height: '120px'  }}/>
                    {ownProfile ? <EditOutlinedIcon 
                    sx={{fontSize: 30, mr: 2, mt: 1, cursor: 'pointer'}} 
                    // onClick={() => { navigate(`/profile/:${userId}/edit`) }} >
                    onClick={handleOpenDialog} >
                    </EditOutlinedIcon> : <></>}
                </div>
                <div className={styles.ProfileHeaderContent}>
                    <div className={styles.ProfileHeaderNameAndRating}>
                        <Typography variant="h4" sx={{fontWeight: '600'}}>{name}</Typography>
                        {isProfessional ? 
                            <div className={styles.ProfileHeaderRating}>
                                <Typography variant="h5" sx={{fontWeight: '550'}}>{avgRating}</Typography>
                                <StarIcon sx={{ color: 'orange', fontSize: 25 , ml: 0.5 }}></StarIcon>
                                <Typography variant="h5" sx={{fontWeight: '350', color: 'lightgray', ml: 0.5}}>({numRatings})</Typography>
                            </div>
                        : <></>}
                    </div>
                    <div className={styles.ProfileHeaderInfo}>
                        <MailOutlineIcon sx={{mt:0.3}}></MailOutlineIcon>
                        <Typography variant="subtitle1" sx={{ml:0.5, height:26}}>{email}</Typography>
                    </div>
                    <div className={styles.ProfileHeaderInfo}>
                        <WebAssetIcon  sx={{mt:0.3}}></WebAssetIcon>
                        <Typography variant="subtitle1" sx={{height: 26, ml:0.5}}>{website}</Typography>
                    </div>
                    <div className={styles.ProfileHeaderInfo}>
                        <PhoneEnabledIcon  sx={{mt:0.3}}></PhoneEnabledIcon>
                        <Typography variant="subtitle1" sx={{height: 2, ml:0.5}}>{phoneNumber}</Typography>
                    </div>
                </div>
               
            </div>
            <div>
                {/* <Button variant="outlined" onClick={handleOpenDialog}>
                    Open Form Dialog
                </Button> */}
                <DynamicFormDialog
                    open={isDialogOpen}
                    onClose={handleCloseDialog}
                    formConfig={isProfessional ? formConfigProfessional : formConfigCompany}
                    userId={userId}
                    userType={userType}
                    title={`Edit ${userType} profile`}
                />
            </div>
        </div>
        
    );
}

export default ProfileHeader;