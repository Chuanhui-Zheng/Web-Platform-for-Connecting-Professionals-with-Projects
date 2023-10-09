import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';


import styles from '../../../styles/Professional/Dashboard.module.css'

const ProjectCard  = ({ projectName, projectDescription }) => {
    const navigate = useNavigate();
    return (
        <button className={styles.dashboardProjectButton} onClick={() => { navigate('projectdetails/{id}') }}>
            <div className={styles.dashboardProjectContent}>
                <h1 className={styles.projectName}>{projectName}</h1>
                <div className={styles.projectDescription}>{projectDescription}</div>
                {/* <p className={styles.projectDetails} onClick={() => { navigate('projectdetails/{id}') }}>Project Details {'>'}</p> */}
            </div>
            <Button size="small" sx={{color: '#f5a67e'}} onClick={() => { navigate('projectpage/{id}') }}>Project Details {'>'}</Button>  
            {/* TODO: this needs clarification if we direct to project page or details or both */}
        </button>
    )
}

export default ProjectCard;