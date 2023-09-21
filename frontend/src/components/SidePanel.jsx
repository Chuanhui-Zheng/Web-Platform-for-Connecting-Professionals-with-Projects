import React from "react";
import { apiGet } from '../api';
import BrowseCards from './BrowseCards';
import { styled } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import SearchBar from '../components/SearchBar';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';

// drawer width size of the viewport
const drawerWidth = '23%';

// opened drawer styles
const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});
  
// closed drawer styles
const closedMixin = (theme) => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

// Header Search Bar style for the side panel
const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));
  
  
// Overall side panel style
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: 'nowrap',
	boxSizing: 'border-box',
	variants: [
		{
			props: ({ open }) => open,
			style: {
				...openedMixin(theme),
				'& .MuiDrawer-paper': openedMixin(theme),
			},
		},
		{
			props: ({ open }) => !open,
			style: {
				...closedMixin(theme),
				'& .MuiDrawer-paper': closedMixin(theme),
			},
		},
	],
	}),
);

/**
 * 
 * @param {*} param0 
 * @returns 
 * Component that creates the side panel for browsing all projects.
 * This includes the search bar, filter dropdowns and project listings via BrowseCards
 */
function SidePanel({ projectID, onSelectProject }) {
	const [allProjects, setAllProjects] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	const [searchResults, setSearch] = React.useState([]);
	const [open, setOpen] = React.useState(true);

	// side panel opener
	const handleDrawerOpen = () => {
		setOpen(true);
	};
	
	// side panel closer
	const handleDrawerClose = () => {
		setOpen(false);
	};

	// Get all projects from the database 
	React.useEffect(() => {
		apiGet('/project/listall', )
		.then(data => {
			if (!data.error) {
				setAllProjects(data);
				setSearch(data);
			} else {
				console.error("Error fetching project list:", data.error);
			}
		})
		.catch(err => {
			console.error("Failed to fetch project list:", err);
		})
		.finally(() => setIsLoading(false));
	}, []);

	// check if all projects listings are loaded
	if (isLoading) {
			return <Box sx={{width: '100%', height: '100%', background:'rgba(255,255,255, 0.3)', boxShadow: '0 4px 6px rgba(0,0,0,0.1)',border:'1px solid #fff' , borderRadius:'20px'}}>
				<Box sx={{display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100vh',
				textAlign: 'center'}}>
					<Typography variant="h6" color="white" component="h1" gutterBottom>
						Loading projects...
						<LinearProgress color="success" />
					</Typography>
				</Box>
			</Box>
	}

	return (
		<Drawer variant="permanent" open={open} sx={{ backgroundColour: 'none', paddingLeft:'25px'}}>
			<DrawerHeader></DrawerHeader>
			<DrawerHeader>
				{open === false ? 
				<Stack direction="row">
					<IconButton onClick={handleDrawerOpen}><SearchIcon /><ChevronRightIcon />  </IconButton>
				</Stack> 
				: 
				<Stack direction="row" sx={{width:'100%', marginTop:'7vh', paddingTop: { xs: "40px", sm: "0px", md: "0px" },}}>
					<SearchBar allProjects={allProjects} setSearch={setSearch}> </SearchBar>
					<IconButton onClick={handleDrawerClose}><ChevronLeftIcon/></IconButton>
				</Stack>
				}
			</DrawerHeader>
			<Box sx={{ overflow: 'auto', width: '100%', marginTop:'10vh'}}>
				{open === false ? 
				<div></div>
				: 
				<List>
					{searchResults.length !== 0 && searchResults.map((project, idx) => (
					<ListItem key={idx} id={project.projectId} onClick={() => onSelectProject(project.projectId)} 
					className={`project-card ${projectID === project.projectId ? 'selected' : ''}`} disablePadding >
						<BrowseCards project={project} />
					</ListItem>
					))}
					{searchResults.length == 0 && <ListItem sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}> Currently No Projects Found</ListItem>}
				</List>
				}
			</Box>
	</Drawer>
	);
}

SidePanel.propTypes = {
	projectID: PropTypes.string,
	onSelectProject: PropTypes.func,
}


export default SidePanel;
