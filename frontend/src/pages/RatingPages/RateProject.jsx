import * as React from 'react';
import RaitingMainContent from '../../components/RaitingMainContent';
import {Typography, Box, Card} from '@mui/material'
import { apiGet } from '../../api';


function RateProfessional() {
	const currentUrl = window.location.href;
    const [projectId, setProjectId] = React.useState('');
	const [projectName, setProjectName] = React.useState('');
    const [companyId, setCompanyId] = React.useState('');
    const [selectedUser, setSelectUserID] = React.useState(null);

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
				console.log("fuck::", data)
				setProjectName(data.projectName);
                setCompanyId(data.pCompanyId);
                console.log(data.pCompanyId)
                apiGet("/user/details/company", `id=${data.pCompanyId}`)
                .then((data) => {
                    if (!data.error) {
                        setSelectUserID(data);
                        console.log("Profile fetched", data);
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
			{/* <Typography variant="h3" sx={{marginLeft: 'auto', marginRight: 'auto'}}>Review</Typography> */}
			<div style={{ display: "flex", flexDirection: 'row', width: '100%', height: '100%'}}>
				<Box sx={{ flex: '1' }}>
                <Card sx={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', marginRight: '4vw', paddingRight: '1vw', borderRadius:'0px 0px 0px 20px'}}>
                    <Typography  gutterBottom sx={{fontSize:'30px', fontWeight: '600', marginLeft: 'auto', marginRight: 'auto'}}>
                        Project: {projectName}
                    </Typography>
                    <Typography variant='h7' sx={{marginLeft: 'auto', marginRight: 'auto'}}>Start Reviewing the Project!</Typography>
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