import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// import { Box, Button, AppProvider, PageContainer, Paper, useTheme, useDemoRouter, Typography, } from '@mui/material';
import { Box, Button, useTheme } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/icons-material/ExpandMore';
// import { AppProvider, PageContainer, useDemoRouter } from '@toolpad/core';
import { PageContainer } from '@toolpad/core/PageContainer';
import { AppProvider } from '@toolpad/core/AppProvider';
import { useDemoRouter } from '@toolpad/core/internals';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import ProjectCard1 from '../../components/DashboardCard.jsx';
import { getProjects } from '../../helpers.js';
import decodeJWT from '../../decodeJWT.js';
import SnackbarAlert from '../../components/SnackbarAlert.jsx';

import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid2';
import ListItem from '@mui/material/ListItem';
import BrowseCards from '../../components/BrowseCards.jsx';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useDashboard } from '../../context/DashboardContext.jsx';


// import Form from "../components/Form"
const titleStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    // fontSize: '20px',
    // border: '1px solid #fff',
    backgroundColour: 'white',
    margin: '0px',
    padding: '15px 45px',
    color: '#344649',
};

const projectTitleStyle = {
    margin: '0px',
    padding: '0px',
    fontSize: '18px',
    color: '#344649'
};

const textStyle = {
    fontSize: '15px',
    textAlign: 'center'
}


const NAVIGATION = [
    { segment: '', title: 'Dashboard' },
    { segment: 'projects', title: 'Projects' },
];

const boardWrapStyle = {
    borderRadius: "20px",
    backgroundColour: 'aliceblue',
    color: '#344649',
}

function CompanyDashboard() {

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

    const handleChange =  (event, newValue) => {
        setValue(newValue);
    };

    const toggleSnackbar = () => {
        setShowSnackbar(!showSnackBar)
    }  

    React.useEffect(() => {
        if (location.state?.showSnackBar) {
            setShowSnackbar(true);
            setMessage(location.state.message);
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [location.state]);


    React.useEffect(() => {
        const getToken = localStorage.getItem("token");
        if (getToken != null) {
            const tokenData = decodeJWT(getToken);
            setOwnUserId(tokenData.userId);
        }
    }, []);

    React.useEffect(() => {
        if (ownUserId) {
            console.log('userID', ownUserId)
            async function fetchProjects() {
                const active = await getProjects(parseInt(ownUserId), 'Active');
                setActiveProjects(active);
                const completed = await getProjects(parseInt(ownUserId), 'Complete');
                setCompletedProjects(completed);
            }
            fetchProjects();
        }
    }, [ownUserId, reloadDashboard])

    
    const [isCompany, setIsCompany] = React.useState(false);

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
        {/* <Accordion defaultExpanded>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                sx={{margin: '0px', backgroundColor:"grey"}}
                >
                <div style={projectTitleStyle}>Current Projects</div>
            </AccordionSummary>
            <AccordionDetails>
                {activeProjects.length == 0 ? <><div style={textStyle}> No Projects Listed. Apply for a Project!</div></>:<></>}
                {activeProjects.map((project, idx) => (
                    <ProjectCard 
                        key={idx}
                        projectName={project.projectName}
                        projectDescription={project.projectDescription}
                        projectId={project.projectId}
                    />
                ))}
            </AccordionDetails>
        </Accordion>
        
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                >
                <div style={projectTitleStyle}>Completed Projects</div>
            </AccordionSummary>
            <AccordionDetails>
            {completedProjects.length == 0 ? <><div style={textStyle}> No Projects Listed. Complete a Project!</div></>:<></>}
                {completedProjects.map((project, idx) => (
                    <ProjectCard
                        key={idx}
                        projectName={project.projectName}
                        projectDescription={project.projectDescription}
                        projectId={project.projectId}
                    />
                ))}
            </AccordionDetails>
        </Accordion> */}
        </Box>
        {showSnackBar && <SnackbarAlert message={message} toggleSuccess={toggleSnackbar}/>}
        </AppProvider>
    );
}

export default CompanyDashboard;