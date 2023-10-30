import React from 'react';
import { useNavigate } from 'react-router-dom';

// import { Box, Button, AppProvider, PageContainer, Paper, useTheme, useDemoRouter, Typography, } from '@mui/material';
import { Box, Button, useTheme } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { AppProvider, PageContainer, useDemoRouter } from '@toolpad/core';
import { PageContainer } from '@toolpad/core/PageContainer';
import { AppProvider } from '@toolpad/core/AppProvider';
import { useDemoRouter } from '@toolpad/core/internals';

import ProjectCard from '../components/Professional/Dashboard/ProjectCard.jsx';
import { getProjects } from '../helpers.js';
import decodeJWT from '../decodeJWT.js';

// import Form from "../components/Form"
const titleStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid #fff',
    margin: '0px'
    // padding: '25px'
};

const projectTitleStyle = {
    margin: '0px',
    padding: '0px',
    fontSize: '18px',
    color: '#344649'
};


const NAVIGATION = [
    { segment: '', title: 'Dashboard' },
    { segment: 'projects', title: 'Projects' },
];

function CompanyDashboard() {

    const navigate = useNavigate();
    const router = useDemoRouter('/companydashboard');
    const theme = useTheme();
    
    const [activeProjects, setActiveProjects] = React.useState([]);
    const [completedProjects, setCompletedProjects] = React.useState([]);
    const [ownUserId, setOwnUserId] = React.useState('');

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
    }, [ownUserId])

    
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
        <AppProvider className="APP" sx={{ backgroundColour: 'none' }} navigation={NAVIGATION} router={router} theme={theme}>
        <PageContainer className="container" maxWidth={false} sx={{width:"100%", "@media (min-width: 0px)": { paddingRight: "25px", paddingLeft: "25px" }, margin: "0px"}}>
        <Box className="title" style={titleStyle}>
            <div>
                <h1>Dashboard</h1>
            </div>
            {isCompany ? <Button variant="contained" onClick={() => { navigate('createproject') }}> + Create Project</Button>  : <></>   }
        </Box>    
        <Accordion defaultExpanded>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                sx={{margin: '0px'}}
                >
                <div style={projectTitleStyle}>Current Projects</div>
            </AccordionSummary>
            <AccordionDetails>
                {activeProjects.map((project, idx) => (
                    <ProjectCard 
                        key={idx}
                        projectName={project.projectName}
                        projectDescription={project.projectDescription}
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
                {completedProjects.map((project, idx) => (
                    <ProjectCard
                        key={idx}
                        projectName={project.projectName}
                        projectDescription={project.projectDescription}
                    />
                ))}
            </AccordionDetails>
        </Accordion>
        </PageContainer> 
        </AppProvider>
    );
}

export default CompanyDashboard;