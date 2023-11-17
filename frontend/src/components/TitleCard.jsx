import * as React from 'react';
import styles from"../styles/Professional/Dashboard.module.css";
import { useNavigate } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import ErrorIcon from '@mui/icons-material/Error';
function TitleCard(title, body, type) {
    const navigate = useNavigate();

    return (
        <button className={styles.dashboardCard} onClick={() => { navigate('') }}>
            {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEdP1P4S9jEQDRT3Ccix1TLyVYdYfmjAUFBQ&s" alt="" className={styles.dashboardImage} /> */}
            {type === 'active' && <ErrorIcon color="primary" fontSize="large"/>}
            {type === 'complete' && <CheckCircleIcon color="success" fontSize="large"/>}
            {type === 'pending' && <AccessTimeFilledIcon color="disabled" fontSize="large"/>}
            {type === 'cert' && <WorkspacePremiumIcon sx={{ color: 'orange' }} fontSize="large"/>}

            <h1 className={styles.dashboardCardTitle}>{title}</h1>
            <div className={styles.dashboardCardBody}>{body}</div>
        </button>
    )
}

export default TitleCard;