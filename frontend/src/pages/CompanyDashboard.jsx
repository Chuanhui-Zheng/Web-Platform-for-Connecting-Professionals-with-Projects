import React from 'react';
import { useNavigate } from 'react-router-dom';

// import { Box, Button, AppProvider, PageContainer, Paper, useTheme, useDemoRouter, Typography, } from '@mui/material';
import { Box, Button, Paper, useTheme } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
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
//     return (
        // <Box className="title" style={titleStyle}>
        //     <div>
        //         <h1>Dashboard</h1>
        //     </div>

        //     <Button variant="contained">+ Create Project</Button>     
        // </Box>
//         // <div>
//         //     <h1>Welcome to the cOMPANY DASHBAORD Page</h1>
//         // </div>
//     );
// }
    const navigate = useNavigate();
    const router = useDemoRouter('/companydashboard');
    const theme = useTheme();

    return (
        <AppProvider className="APP" sx={{ backgroundColour: 'none' }} navigation={NAVIGATION} router={router} theme={theme}>
        <PageContainer className="container" sx={{ "@media (min-width: 0px)": { paddingRight: "25px", paddingLeft: "25px" }}}>
        <Box className="title" style={titleStyle}>
            <div>
                <h1>Dashboard</h1>
            </div>
            <Button variant="contained" onClick={() => { navigate('createproject') }}> + Create Project</Button>     
        </Box>    
        {/* <Paper className="Paper">
            <PageContainer className="container" sx={{ backgroundColour: 'black' }}>Current Projects</PageContainer>

        </Paper> */}
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
                {ProjectCard('Project Name 1', "aadfadfadsfasdfaadfadfadsfasdfaadfadfadsfasdfaadfadfadsfasdfafdfdfdfdsfdsfdswaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")}
                {ProjectCard('Project Name 2', "aadfadfadsfasdfaadfadfadsfasdfaadfadfadsfasdfaadfadfadsfasdfafdfdfdfdsfdsfdswaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")}
                {ProjectCard('Project Name 3', "aadfadfadsfasdfaadfadfadsfasdfaadfadfadsfasdfaadfadfadsfasdfafdfdfdfdsfdsfdswaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")}
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
            {ProjectCard('Project Name 1', "aadfadfadsfasdfaadfadfadsfasdfaadfadfadsfasdfaadfadfadsfasdfafdfdfdfdsfdsfdswaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")}
            {ProjectCard('Project Name 2', "aadfadfadsfasdfaadfadfadsfasdfaadfadfadsfasdfaadfadfadsfasdfafdfdfdfdsfdsfdswaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")}
            {ProjectCard('Project Name 3', "aadfadfadsfasdfaadfadfadsfasdfaadfadfadsfasdfaadfadfadsfasdfafdfdfdfdsfdsfdswaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")}
           
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
                {ProjectCard('Project Name 1', "aadfadfadsfasdfaadfadfadsfasdfaadfadfadsfasdfaadfadfadsfasdfafdfdfdfdsfdsfdswaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")}
                {ProjectCard('Project Name 2', "aadfadfadsfasdfaadfadfadsfasdfaadfadfadsfasdfaadfadfadsfasdfafdfdfdfdsfdsfdswaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")}
                {ProjectCard('Project Name 3', "aadfadfadsfasdfaadfadfadsfasdfaadfadfadsfasdfaadfadfadsfasdfafdfdfdfdsfdsfdswaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")}
            </AccordionDetails>
        </Accordion>
        </PageContainer> 
        </AppProvider>
    );
}

export default CompanyDashboard;