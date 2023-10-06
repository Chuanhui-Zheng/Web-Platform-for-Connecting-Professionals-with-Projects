import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../../styles/Professional/Dashboard.module.css'

const ProjectCard  = (projectName, projectDescription) => {
    return (
        <button className={styles.dashboardProjectButton}>
            <h1 className={styles.projectName}>Project Name</h1>
            <div className={styles.dashboardProjectContent}>
                <p className={styles.projectDesc}>Description: {projectDescription}</p>
                <p className={styles.projectDetails}>Project Details {'>'}</p>
            </div>
        </button>
    )
}

export default ProjectCard;