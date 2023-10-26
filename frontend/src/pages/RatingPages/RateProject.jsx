import * as React from 'react';
import RaitingMainContent from '../../components/RaitingMainContent';
import {Typography, Box, Card} from '@mui/material'
import { apiGet } from '../../api';

/**
 * 
 * @returns 
 * 
 * Page for a company to rate a professional that has worked on one of their project.
 */
function RateProfessional() {
	const currentUrl = window.location.href;
	const [projectId, setProjectId] = React.useState('');
	const [projectName, setProjectName] = React.useState('');
	const [selectedUser, setSelectUserID] = React.useState(null);

	/**
	 * Gets the projectId from the URL.
	 */
	React.useEffect(() => {
		setProjectId(currentUrl.split('/')[currentUrl.split('/').length - 2])
	}, []);

	/**
	 * Use effect to get the project infomation when a project Id is changed.
	 */
	React.useEffect(() => {
		if (projectId) {
			apiGet('/project/details', `projectId=${projectId}`)
			.then((data) => {
				setProjectName(data.projectName);
				apiGet("/user/details/company", `id=${data.pCompanyId}`)
				.then((data) => {
					if (!data.error) {
						setSelectUserID(data);
					} else {
						throw new Error("Get Details Failed");
					}
				})
				.catch((err) => {
					alert(err);
				});
			})
		}
		
	}, [projectId])

	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<div style={{ display: "flex", flexDirection: 'row', width: '100%', height: '100%'}}>
				<Box sx={{ flex: '1' }}>
					<Card sx={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', marginRight: '4vw', paddingRight: '1vw', borderRadius:'0px 0px 0px 20px'}}>
						<Typography  gutterBottom sx={{fontSize:'30px', fontWeight: '600', marginLeft: 'auto', marginRight: 'auto'}}>
							Project: {projectName}
						</Typography>
						<Typography variant='h7' sx={{marginLeft: 'auto', marginRight: 'auto'}}>
							Start Reviewing the Project!
						</Typography>
					</Card>
				</Box>
				<Box sx={{ flex: '3' }}>
					<RaitingMainContent selectedUser={selectedUser} projectId={projectId}/>
				</Box>
			</div>
		</div>
	);
};
  
  export default RateProfessional;