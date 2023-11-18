import * as React from 'react';
import ProfileHeader from "../../components/ProfileHeader";
import styles from "../../styles/Professional/ProfessionalProfile.module.css"
import ProjectCard1 from "../../components/ProjectCard1";
import { Box, Typography } from '@mui/material';
import { apiGet } from '../../api';
import decodeJWT from "../../decodeJWT";
import { getProjects } from '../../helpers';
import Grid from '@mui/material/Grid2';
import { useProfile } from '../../context/ProfileContext';

/**
 * 
 * @param {*} param0 
 * @returns 
 * Company profile page that shows all the details of a company
 */
const CompanyProfile = ({userId}) => {
	const [userType, setUserType] = React.useState('');
	const [ownUserId, setOwnUserId] = React.useState('');
	const [ownProfile, setOwnProfile] = React.useState(true);
	const [projects, setProjects] = React.useState([]);
	const [companyDescription, setNewCompanyDescription] = React.useState(true);
	const reloadProfile = useProfile();

  // Check if viewing own profile
	React.useEffect(() => {
		const getToken = localStorage.getItem("token");
		if (getToken != null) {
			const tokenData = decodeJWT(getToken);
			setOwnUserId(tokenData.userId);
			setUserType(tokenData.userType);
			if (tokenData.userId != userId) {
				setOwnProfile(false);
			}
		}
	}, []);

	// Get profile details
	React.useEffect(() => {
		if (ownUserId && userType) {
				
			async function fetchProjects() {
				const projectData = await getProjects(userId, '');
				setProjects(projectData);
			}
			fetchProjects()

			apiGet("/user/details/company", `id=${userId}`)
			.then((data) => {
				if (!data.error) {
					setNewCompanyDescription(data.companyDescription);
				} else {
					throw new Error("Get Profile Failed");
				}
			})
			.catch(() => {
					alert("Fetch profile not valid.");
			});
		}
	}, [ownUserId, userType, reloadProfile]);

	return (
		<>
			<Box sx={{ width: '100%', minHeight: '2200px', bgcolor: '#F5F5F5',background: 'linear-gradient(to bottom, #F5F5F5, #F5F5F5)', borderRadius: '20px' }}>
				<ProfileHeader userId={userId} userType="company" ownProfile={ownProfile}></ProfileHeader>
				<div className={styles.ProfessionalProfileContent}>
					<Typography variant="h5" sx={{ fontWeight: 'bold', mt:2, mb:1 }}>Summary</Typography>
					<div className={styles.ProfessionalProfileText}>{companyDescription}</div>
					<Typography variant="h5" sx={{ fontWeight: 'bold', mt:3 }}>Projects</Typography>
					<br></br>
					{projects.length > 0 ? (
						<Grid container spacing={2} sx ={{flexWrap: "wrap"}}>
							{projects.map((project, idx) => (
								<Grid item size={5} key={idx}>
									<ProjectCard1 project={project} />
								</Grid>
							))}
						</Grid>
						) : (
							<div > No Projects Listed. Apply for a Project!</div>
						)}
				</div>
			</Box>
		</>
	);
}

export default CompanyProfile;