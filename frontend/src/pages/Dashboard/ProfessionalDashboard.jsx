import React from 'react';
import TitleCard from '../../components/TitleCard.jsx'; 
import { Box } from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Grid from '@mui/material/Grid2';
import ListItem from '@mui/material/ListItem';
import decodeJWT from '../../decodeJWT.js';
import { getProfessionalProjectsFromStatus, getProjects } from '../../helpers.js';
import ProjectCard1 from '../../components/DashboardCard.jsx';
import { apiGet } from '../../api';
import { useNavigate } from 'react-router-dom';
import SnackbarAlert from '../../components/SnackbarAlert.jsx';

const textStyle = {
	fontSize: '15px',
	textAlign: 'center'
}

/**
 * 
 * @returns 
 * 
 * Component for the professional's dashboard.
 */
const ProfessionalDashboard = () => {
	const [activeProjects, setActiveProjects] = React.useState([]);
	const [pendingProjects, setPendingProjects] = React.useState([]);
	const [completedProjects, setCompletedProjects] = React.useState([]);
	const [value, setValue] = React.useState('active');
	const [ownUserId, setOwnUserId] = React.useState();
	const [showSnackBar, setShowSnackbar] = React.useState(false);
	const [message, setMessage] = React.useState('');
	const [numCerts, setnumCerts] = React.useState('');
	const navigate = useNavigate();

	/**
	 * 
	 * @param {*} event 
	 * @param {*} newValue 
	 * 
	 * Function to toggle to update visuals on the dashboard
	 */
	const handleChange =  (event, newValue) => {
		setValue(newValue);
	};

	/**
	 * Function to check if snack bar needs to be shown based on actions from another page.
	 */
	React.useEffect(() => {
		if (location.state?.showSnackBar) {
			setShowSnackbar(true);
			setMessage(location.state.message);
			navigate(location.pathname, { replace: true, state: {} });
		}
	}, [location.state]);

	/**
	 * Function to toggle snack bar on and off.
	 */
	const toggleSnackbar = () => {
		setShowSnackbar(!showSnackBar)
	}  
  
	/**
	 * Use effect to get the users infomation to render the correct details
	 */
	React.useEffect(() => {
		const getToken = localStorage.getItem("token");
		if (getToken != null) {
			const tokenData = decodeJWT(getToken);
			setOwnUserId(tokenData.userId)
		}
	}, []);

	/**
	 * Use effect to get the users correct projects.
	 */
	React.useEffect(() => {
		if (ownUserId) {
			async function fetchProjects() {
				const active = await getProfessionalProjectsFromStatus(ownUserId, 'Active');
				setActiveProjects(active);
				const complete = await getProfessionalProjectsFromStatus(ownUserId, 'Complete');
				setCompletedProjects(complete);
				const pending = await getProjects(parseInt(ownUserId), 'Pending approval');
				setPendingProjects(pending);
			}
			fetchProjects()
			
			apiGet("/profile/viewCertificate", `id=${ownUserId}`)
			.then((data) => {
				if (!data.error) {
					setnumCerts(Object.keys(data.professionalCertificates).length)
				} else {
					throw new Error("Get Cert Failed");
				}
			})
			.catch(() => {
				alert("Fetch failed");
			});
		}
	}, [ownUserId]);

	return (
		<>
			<Box sx={{bgcolor: '#F5F5F5', borderRadius: '20px', borderTopRightRadius: '20px', minHeight: '600px' }}>
				<Box sx={{textAlign:'center'}}>
					{TitleCard('Active Projects', activeProjects.length, 'active')}
					{TitleCard('Projects Completed', completedProjects.length, 'complete')}
					{TitleCard('Pending Projects', pendingProjects.length, 'pending')}
					{TitleCard('Certifications', numCerts, 'cert')}
				</Box>
				<br></br>
				<br></br>
				<TabContext value={value}>
					<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
						<TabList onChange={handleChange} aria-label="lab API tabs example">
							<Tab label="Active Projects" value="active" />
							<Tab label="Pending Projects" value="pending" />
							<Tab label="Completed Projects" value="completed" />
						</TabList>
					</Box>

					<TabPanel value="active">
						{activeProjects.length > 0 ? (
							<Grid container spacing={2} sx ={{flexWrap: "wrap"}}>
								{activeProjects.map((project, idx) => (
									<Grid item size={4} key={idx}>
										<ListItem disablePadding>
											<ProjectCard1 project={project} />
										</ListItem>
									</Grid>
								))}
							</Grid>
						) : (
							<div style={textStyle}> No Projects Listed. Apply for a Project!</div>
						)}

					</TabPanel>
					<TabPanel value="pending">
						{pendingProjects.length > 0 ? (
							<Grid container spacing={2} sx ={{flexWrap: "wrap"}}>
								{pendingProjects.map((project, idx) => (
									<Grid item size={4} key={idx}>
										<ListItem disablePadding>
											<ProjectCard1 project={project} />
										</ListItem>
									</Grid>
								))}
							</Grid>
						) : (
							<div style={textStyle}> No Projects Listed. Apply for a Project!</div>
						)}
					</TabPanel>
				
					<TabPanel value="completed">
						{completedProjects.length > 0 ? (
							<Grid container spacing={7}>
								{completedProjects.map((project, idx) => (
									<Grid item size={4} key={idx}>
										<ListItem disablePadding>
											<ProjectCard1 project={project} />
										</ListItem>
									</Grid>
								))}
							</Grid>
						) : (
							<div style={textStyle}> No Projects Listed. Complete a Project!</div>
						)}
					</TabPanel>
				</TabContext>
				{showSnackBar && <SnackbarAlert message={message} toggleSuccess={toggleSnackbar}/>}
			</Box>
		</>
	);
}

export default ProfessionalDashboard;