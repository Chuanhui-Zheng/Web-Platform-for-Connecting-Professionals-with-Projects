import * as React from 'react';
import RaitingMainContent from '../components/RaitingMainContent';
import RaitingSideBar from '../components/RaitingSideBar';
import {Typography, Box} from '@mui/material'
import { apiGet } from '../api';

function RateProfessional() {
	const currentUrl = window.location.href;
    const [projectId, setProjectId] = React.useState('');
	const [professionals, setProfessionals] = React.useState([]);
	const [projectName, setProjectName] = React.useState('');
	const [selectedUser, setSelectUserID] = React.useState(null);
	const [selectName, setSelectName] = React.useState(null);

	React.useEffect(() => {
		// const glob = localStorage.getItem('token');
		// setToken(glob);
		for (const segment of currentUrl.split('/')) {
			console.log(segment);
		}

		setProjectId(currentUrl.split('/')[currentUrl.split('/').length - 2])
	}, []);


	React.useEffect(() => {
		if (projectId) {
			apiGet('/project/details', `projectId=${projectId}`)
			.then((data) => {
				console.log("fuck::", data.listOfProfessionals)
				setProfessionals(data.listOfProfessionals);
				setProjectName(data.projectName);
			})
		}
		
	}, [projectId])

	const handleSelectUser = (user) => {
		setSelectUserID(user);
	};

	const handleSelectName = (name) => {
		setSelectName(name);
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<Typography variant="h3" sx={{marginLeft: 'auto', marginRight: 'auto'}}>Review</Typography>
			<div style={{ display: "flex", flexDirection: 'row', width: '100%', height: '100%'}}>
				<Box sx={{ flex: '1' }}>
					<RaitingSideBar selectedUser={selectedUser} selectName={selectName} onSelectUser={handleSelectUser} professionals={professionals} projectName={projectName}/>
				</Box>
				<Box sx={{ flex: '3' }}>
					<RaitingMainContent selectedUser={selectedUser}/>
				</Box>
			</div>
		</div>
	);
};
  
  export default RateProfessional;