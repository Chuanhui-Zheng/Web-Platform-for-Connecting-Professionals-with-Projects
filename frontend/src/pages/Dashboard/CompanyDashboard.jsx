import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { Box, Button, useTheme } from '@mui/material';
import { AppProvider } from '@toolpad/core/AppProvider';
import { useDemoRouter } from '@toolpad/core/internals';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import ProjectCard1 from '../../components/ProjectCard1.jsx';
import { getProjects } from '../../helpers.js';
import decodeJWT from '../../decodeJWT.js';
import SnackbarAlert from '../../components/SnackbarAlert.jsx';

import Grid from '@mui/material/Grid2';
import ListItem from '@mui/material/ListItem';
import { useDashboard } from '../../context/DashboardContext.jsx';

const titleStyle = {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	backgroundColour: 'white',
	margin: '0px',
	padding: '15px 45px',
	color: '#344649',
};

const textStyle = {
	fontSize: '15px',
	textAlign: 'center'
}


const NAVIGATION = [
	{ segment: '', title: 'Dashboard' },
	{ segment: 'projects', title: 'Projects' },
];

/**
 * 
 * @returns 
 * 
 * Component for company daashboard content.
 */
const CompanyDashboard = () => {

	const navigate = useNavigate();
	const router = useDemoRouter('/companydashboard');
	const theme = useTheme();
	const location = useLocation();

	const [value, setValue] = React.useState('active');
	const [activeProjects, setActiveProjects] = React.useState([]);
	const [completedProjects, setCompletedProjects] = React.useState([]);
	const [ownUserId, setOwnUserId] = React.useState('');
	const [showSnackBar, setShowSnackbar] = React.useState(false);
	const [message, setMessage] = React.useState('');
	const reloadDashboard = useDashboard();
	const [isCompany, setIsCompany] = React.useState(false);


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
	 * Function to toggle snack bar on and off.
	 */
	const toggleSnackbar = () => {
		setShowSnackbar(!showSnackBar)
	}  

	/**
	 * Use effect to check the location that directed to this page to check if snack bar is needed.
	 */
	React.useEffect(() => {
		if (location.state?.showSnackBar) {
			setShowSnackbar(true);
			setMessage(location.state.message);
			navigate(location.pathname, { replace: true, state: {} });
		}
	}, [location.state]);

	/**
	 * Use effect to render the correct users data.
	 */
	React.useEffect(() => {
		const getToken = localStorage.getItem("token");
		if (getToken != null) {
			const tokenData = decodeJWT(getToken);
			setOwnUserId(tokenData.userId);
		}
	}, []);

	/**
	 * Use effect to reload a profile to get updated data to show visually.
	 */
	React.useEffect(() => {
		if (ownUserId) {
			async function fetchProjects() {
				const active = await getProjects(parseInt(ownUserId), 'Active');
				setActiveProjects(active);
				const completed = await getProjects(parseInt(ownUserId), 'Complete');
				setCompletedProjects(completed);
			}
			fetchProjects();
		}
	}, [ownUserId, reloadDashboard])

	/**
	 * Use effect to check the type of the user.
	 */
	React.useEffect(() => {
		const getToken = localStorage.getItem("token");
		if (getToken != null) {
			const tokenData = decodeJWT(getToken);
			if (tokenData.userType === "company") {
				setIsCompany(true);
			}
		}
		}, []);

	return (
		<AppProvider className="APP" sx={{ backgroundColour: 'green' }} navigation={NAVIGATION} router={router} theme={theme}>
			<Box sx={{bgcolor: '#F5F5F5', borderRadius: '20px', borderTopRightRadius: '20px', minHeight: '600px' }}>
				<Box className="title" sx={{ borderTopLeftRadius: '20px', borderTopRightRadius: '20px'}} style={titleStyle}>
					<div>
						<h1>Dashboard</h1>
					</div>
					{isCompany ? <Button variant="contained" sx={{backgroundColor:'#006792'}} onClick={() => { navigate('createproject') }}> + Create Project</Button>  : <></>   }
				</Box> 
				<TabContext value={value}>
					<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
						<TabList onChange={handleChange} aria-label="lab API tabs example">
							<Tab label="Active Projects" value="active" />
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
				<TabPanel value="completed">
					{completedProjects.length > 0 ? (
						<Grid container spacing={2} sx ={{flexWrap: "wrap"}}>
							{completedProjects.map((project, idx) => (
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
				</TabContext>
			</Box>
			{showSnackBar && <SnackbarAlert message={message} toggleSuccess={toggleSnackbar}/>}
		</AppProvider>
	);
}

export default CompanyDashboard;