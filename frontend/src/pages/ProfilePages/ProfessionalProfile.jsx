import * as React from 'react';
import ProfileHeader from "../../components/ProfileHeader";
import styles from "../../styles/Professional/ProfessionalProfile.module.css"
import BasicChips from "../../components/Chip";
import { Box, Typography } from '@mui/material';
import { apiGet } from '../../api';
import decodeJWT from "../../decodeJWT";
import { getProjects } from '../../helpers';
import Certificates from '../../components/CertficateCard';
import PaginationCards from '../../components/Pagination';
import { useProfile } from '../../context/ProfileContext';
import ProjectCard1 from '../../components/ProjectCard1';
import Grid from '@mui/material/Grid2';
import PropTypes from 'prop-types';

/**
 * 
 * @param {*} param0 
 * @returns 
 * Professional profile page that shows all the details of a professional
 */
const ProfessionalProfile = ( { userId } ) => {
    
	const [ownUserId, setOwnUserId] = React.useState();
	const [userType, setUserType] = React.useState('');
	const [ownProfile, setOwnProfile] = React.useState(true);
	const [professionalSkills, setProfessionalSkills] = React.useState([]);
	const [professionalDescription, setProfessionalDescription] = React.useState('');
	const [projects, setProjects] = React.useState([]);
	const [certificates, setCertificates] = React.useState([]);
	const [ratings, setRatings] = React.useState([]);
	const reloadProfile = useProfile();

	// Check if viewing own profile
	React.useEffect(() => {
		const getToken = localStorage.getItem("token");
		if (getToken != null) {
			const tokenData = decodeJWT(getToken);
			setUserType(tokenData.userType)
			setOwnUserId(tokenData.userId)
			if (tokenData.userId != userId) {
				setOwnProfile(false);
			}
		}
	}, []);
  
	// Get profile details and project details and certificates
	React.useEffect(() => {
		if (ownUserId && userType) {

			async function fetchProjects() {
				const projectData = await getProjects(userId, '');
				setProjects(projectData);
			}
			fetchProjects()

			apiGet("/user/details/professional", `id=${userId}`)
			.then((data) => {
				if (!data.error) {
					setProfessionalSkills(data.professionalSkills);
					setProfessionalDescription(data.professionalDescription);
					setRatings(data.professionalRatings);
				} else {
					throw new Error("Get Profile Failed");
				}
			})
			.catch(() => {
				alert("Profile fetch failed.");
			});
			
			apiGet("/profile/viewCertificate", `id=${userId}`)
			.then((data) => {
				if (!data.error) {
					setCertificates(data.professionalCertificates)
				} else {
					throw new Error("Get Cert Failed");
				}
			})
			.catch(() => {
				alert("Certfication fetch6 failed.");
			});
		}
		
	}, [ownUserId, userType, reloadProfile]);

	return (
		<>
			<Box sx={{ width: '100%', minHeight: '1000px', bgcolor: '#F5F5F5', background: 'linear-gradient(to bottom, #F5F5F5, #F5F5F5)', borderRadius: '20px' }}>
				<ProfileHeader userId={userId} userType="professional" ownProfile={ownProfile}></ProfileHeader>
				<div className={styles.ProfessionalProfileContent}>
				<Typography variant="h5" sx={{ fontWeight: 'bold', mt:2, mb:1 }}>Summary</Typography>
						{professionalDescription ? 
							<div className={styles.ProfessionalProfileText}>{professionalDescription}</div> 
							:<div className={styles.ProfessionalProfileText}>No Description Added</div> 
						}
					<Typography variant="h5" sx={{ fontWeight: 'bold', mt:3, mb:1 }}>Skills</Typography>
						{professionalSkills.length > 0 ? (
							<div className={styles.ProfessionalProfileSkillsContainer}>
								{professionalSkills.map((skill, idx) => {
									return (
										<div key={idx} className={styles.ProfessionalProfileSkill}>
											<BasicChips content={skill} />
										</div>
									)
								})}
							</div>
						) : (
							<div > No Skills Added</div>
						)}
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
						<div > Currently No Projects Listed. </div>
					)}
					 <Typography variant="h5" sx={{ fontWeight: 'bold', mt:3,mb:1  }}>Certificates</Typography>
					{certificates.length > 0 ? (
						<Certificates certificates={certificates} ownProfile={ownProfile}></Certificates>
					) : (
						<div> No Certifications Available.</div>
					)}
					<Typography variant="h5" sx={{ fontWeight: 'bold', mt:3, mb:1 }}>Reviews</Typography>
					{console.log(ratings)}
					{ratings.length > 0 ? (
						<PaginationCards reviews={ratings} type="professional" ></PaginationCards>
					) : (
						<div> No Reviews Available.</div>
					)}
				</div>
			</Box>
		</>
	);
}

ProfessionalProfile.propTypes = {
    userId: PropTypes.string,
}

export default ProfessionalProfile;