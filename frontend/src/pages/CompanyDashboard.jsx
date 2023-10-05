import React from 'react';
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
// import Form from "../components/Form"
const titleStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid #fff',
    margin: '0px'
    // padding: '25px'
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

    const router = useDemoRouter('/companydashboard');
    const theme = useTheme();

    return (
        <AppProvider className="APP" sx={{ backgroundColour: 'black' }} navigation={NAVIGATION} router={router} theme={theme}>
        <PageContainer className="container" sx={{ "@media (min-width: 0px)": { paddingRight: "25px", paddingLeft: "25px" }}}>
        <Box className="title" style={titleStyle}>
            <div>
                <h1>Dashboard</h1>
            </div>
            <Button variant="contained">+ Create Project</Button>     
        </Box>    
        {/* <Paper className="Paper">
            <PageContainer className="container" sx={{ backgroundColour: 'black' }}>Current Projects</PageContainer>



        </Paper> */}
        <Accordion defaultExpanded>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                >
                <h2 color="#344649">Active Projects</h2>
            </AccordionSummary>
            <AccordionDetails>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                malesuada lacus ex, sit amet blandit leo lobortis eget.
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                >
                <h2>Applied Projects</h2>
            </AccordionSummary>
            <AccordionDetails>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                malesuada lacus ex, sit amet blandit leo lobortis eget.
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                >
                <h2>Completed Projects</h2>
            </AccordionSummary>
            <AccordionDetails>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                malesuada lacus ex, sit amet blandit leo lobortis eget.
            </AccordionDetails>
        </Accordion>

        </PageContainer> 
        </AppProvider>
    );
}

export default CompanyDashboard;