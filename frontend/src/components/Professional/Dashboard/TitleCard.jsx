import * as React from 'react';
import styles from"../../../styles/Professional/Dashboard.module.css";
import { useNavigate } from 'react-router-dom';

function TitleCard(title, body) {
    const navigate = useNavigate();

    return (
        <button className={styles.dashboardCard} onClick={() => { navigate('') }}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEdP1P4S9jEQDRT3Ccix1TLyVYdYfmjAUFBQ&s" alt="" className={styles.dashboardImage} />
            <h1 className={styles.dashboardCardTitle}>{title}</h1>
            <div className={styles.dashboardCardBody}>{body}</div>
        </button>
    )
}

export default TitleCard;