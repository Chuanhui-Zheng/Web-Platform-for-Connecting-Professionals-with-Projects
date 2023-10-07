import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/ProfileHeader.module.css'
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CustomizedRating from './CustomizedRating'; 

const ProfileHeader  = () => {
    return (
        <div className={styles.ProfileHeaderBar}>
            <AccountCircleIcon className={styles.ProfileHeaderProfilePic}/>
            <div class={styles.ProfileHeaderContent}>
                <div className={styles.ProfileHeaderNameAndRating}>
                    <h1 className={styles.ProfileHeaderName}>Profile Name</h1>
                    <div className={styles.ProfileHeaderRaitingBox}>
                        <CustomizedRating value={3}/>
                    </div>
                </div>
                
                <div className={styles.ProfileHeaderLinks}>
                    <Link to="/companydashboard" className={styles.ProfileHeaderLink}>Email</Link>
                    <Link to="/companydashboard" className={styles.ProfileHeaderLink}>Linkedin</Link>
                    <Link to="/companydashboard" className={styles.ProfileHeaderLink}>Other link</Link>
                </div>
            </div>
        </div>
    );
}

export default ProfileHeader;