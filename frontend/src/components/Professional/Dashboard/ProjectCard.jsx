import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../../styles/Professional/Dashboard.module.css'

const ProjectCard  = (projectName, projectDescription) => {
    return (
        <button className={styles.dashboardProjectButton}>
                <div className={styles.dashboardProjectContent}>
                    <h1 className={styles.projectName}>Project Name</h1>
                    <p className={styles.projectDesc}>Description: {projectDescription}</p>
                </div>
                <p className={styles.projectDetails}>Project Details {'>'}</p>
        </button>
    )
}

export default ProjectCard;