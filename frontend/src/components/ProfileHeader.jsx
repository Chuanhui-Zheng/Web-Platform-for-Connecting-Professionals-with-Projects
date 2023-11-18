import * as React from 'react';
import styles from '../styles/ProfileHeader.module.css'
import { Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import Avatar from '@mui/material/Avatar';
import { apiGet } from '../api';
import DynamicFormDialog from './FormDialog';
import { useProfile } from '../context/ProfileContext';

/**
 * 
 * @param {*} param0 
 * @returns 
 * Component that displays the profile header of a user
 * Displays the banner, name, contact details amd an edit profile button
 * Also displays a profile picture
 */
const ProfileHeader = ({userId, userType, ownProfile, refresh}) => {
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

  // Get user details depending on user type
	React.useEffect(() => {
		if (userType === "company") {    
			apiGet("/user/details/company", `id=${userId}`)
			.then((data) => {
				if (!data.error) {
					setNewName(data.companyName);
					setNewEmail(data.companyEmail);
					setNewPhoneNumber(data.companyPhoneNumber);
					setNewWebsite(data.companyWebsite);
					setNewPhoto(data.companyLogo);
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
				if (!data.error) {
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
	}, [refresh, reloadProfile]);
  
  // Opening edit profile dialog
	const handleOpenDialog = () => {
		setIsDialogOpen(true);
	};
	
  // Closing edit profile dialog
	const handleCloseDialog = () => {
		setIsDialogOpen(false);
	};

	return (
		<div className={styles.Profile}> 
			<div className={styles.ProfileFiller}></div>
			<div className={styles.ProfileHeaderBar}>
				<div className={styles.ProfileBanner}> 
          <Typography  variant="h1" sx={{fontStyle: 'italic', fontWeight: 'bold', color:'#ebad8f', opacity: 0.6}}>PJ</Typography>
        </div>
				<div className={styles.ProfilePicAndEdit}>
						<Avatar className={styles.ProfileHeaderProfilePic} src={photo} sx={{ bgcolor: '#ebad8f', width: '120px', height: '120px',  }}/>
						{ownProfile ? <EditOutlinedIcon 
						sx={{fontSize: 30, mr: 2, mt: 1, cursor: 'pointer'}} 
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
						{website ? <Typography variant="subtitle1" sx={{height: 26, ml:0.5}}>{website}</Typography>
						:<Typography variant="subtitle1" sx={{height: 26, ml:0.5}}>No Website Added</Typography> }
						
					</div>
					<div className={styles.ProfileHeaderInfo}>
						<PhoneEnabledIcon  sx={{mt:0.3}}></PhoneEnabledIcon>
						{phoneNumber ? <Typography variant="subtitle1" sx={{height: 2, ml:0.5}}>{phoneNumber}</Typography>
						:<Typography variant="subtitle1" sx={{height: 2, ml:0.5}}>No Contact Number Added</Typography> }
					</div>
				</div>
			</div>
			<div>
				<DynamicFormDialog open={isDialogOpen} onClose={handleCloseDialog} userId={userId} userType={userType} title={`Edit Profile`}/>
			</div>
		</div>
			
	);
}

export default ProfileHeader;