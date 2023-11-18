import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Professional/Dashboard.module.css'

/**
 * 
 * @param {*} param0 
 * @returns 
 * 
 * Component for project card that shows the vital infomation of a project. On click it naviagates to the project details page 
 * for more details on a project.
 */
const ProjectCard  = ({ projectName, projectDescription, projectId }) => {
	const navigate = useNavigate();
	return (
		<button className={styles.dashboardProjectButton} onClick={() => { navigate(`/projectdetail/${projectId}`) }}>
			<div className={styles.dashboardProjectContent}>
				<h1 className={styles.projectName}>{projectName}</h1>
				<div className={styles.projectDescription}>{projectDescription}</div>
			</div>
			<p className={styles.projectDetails} onClick={() => { navigate(`/projectdetail/${projectId}`) }}>Project Details {'>'}</p>
		</button>
	)
}

export default ProjectCard;