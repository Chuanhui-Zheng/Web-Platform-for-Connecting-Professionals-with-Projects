import * as React from 'react';
import RaitingMainContent from '../../components/RaitingMainContent';
import RaitingSideBar from '../../components/RaitingSideBar';
import { Box} from '@mui/material'
import { apiGet } from '../../api';

/**
 * 
 * @returns 
 * 
 * Page for a company to rate professionals that have participated in their project.
 */
function RateProfessional() {
	const currentUrl = window.location.href;
	const [projectId, setProjectId] = React.useState('');
	const [professionals, setProfessionals] = React.useState([]);
	const [projectName, setProjectName] = React.useState('');
	const [selectedUser, setSelectUserID] = React.useState(null);
	const selectName = null;

	/**
	 * Getting the project Id from the URL.
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
				setProfessionals(data.listOfProfessionals);
				setProjectName(data.projectName);
			})
		}
		
	}, [projectId])

	/**
	 * 
	 * @param {*} user 
	 * 
	 * Function to set the selected user ID on click of their respective card.
	 */
	const handleSelectUser = (user) => {
		setSelectUserID(user);
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<div style={{ display: "flex", flexDirection: 'row', width: '100%', height: '100%'}}>
				<Box sx={{ flex: '1' }}>
					<RaitingSideBar selectedUser={selectedUser} selectName={selectName} onSelectUser={handleSelectUser} professionals={professionals} projectName={projectName}/>
				</Box>
				<Box sx={{ flex: '3' }}>
					<RaitingMainContent selectedUser={selectedUser} projectId={projectId}/>
				</Box>
			</div>
		</div>
	);
};

export default RateProfessional;