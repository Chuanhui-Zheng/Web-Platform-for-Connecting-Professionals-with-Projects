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

    return (
        <AppProvider className="APP" sx={{ backgroundColour: 'none' }} navigation={NAVIGATION} router={router} theme={theme}>
        <PageContainer className="container" maxWidth={false} sx={{width:"100%", "@media (min-width: 0px)": { paddingRight: "25px", paddingLeft: "25px" }, margin: "0px"}}>
        <Box className="title" style={titleStyle}>
            <div>
                <h1>Dashboard</h1>
            </div>
            <Button variant="contained" onClick={() => { navigate('createproject') }}> + Create Project</Button>     
        </Box>    
        <Accordion defaultExpanded>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                sx={{margin: '0px'}}
                >
                <div style={projectTitleStyle}>Active Projects</div>
            </AccordionSummary>
            <AccordionDetails>
                <ProjectCard
                    projectName="Active Project Name 1"
                    projectDescription="Project 1 Description"
                />
                <ProjectCard
                    projectName="Active Project Name 2"
                    projectDescription="Project 2 Description"
                />
                <ProjectCard
                    projectName="Active Project Name 3"
                    projectDescription="Project 3 Description"
                />
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                >
                <div style={projectTitleStyle}>Pending Projects</div>
            </AccordionSummary>
            <AccordionDetails>
                <ProjectCard
                    projectName="Pending Project Name 1"
                    projectDescription="Project 1 Description"
                />
                <ProjectCard
                    projectName="Pending Project Name 2"
                    projectDescription="Project 2 Description"
                />
                <ProjectCard
                    projectName="Pending Project Name 3"
                    projectDescription="Project 3 Description"
                />
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
                <ProjectCard
                    projectName="Completed Project Name 1"
                    projectDescription="Project 1 Description"
                />
                <ProjectCard
                    projectName="Completed Project Name 2"
                    projectDescription="Project 2 Description"
                />
                <ProjectCard
                    projectName="Completed Project Name 3"
                    projectDescription="Project 3 Description"
                />
            </AccordionDetails>
        </Accordion>
        </PageContainer> 
        </AppProvider>
    );
}

export default CompanyDashboard;