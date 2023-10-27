import React from 'react';
import TitleCard from '../components/Professional/Dashboard/TitleCard.jsx'; 
import ProjectCard from '../components/Professional/Dashboard/ProjectCard.jsx';
import styles from '../styles/Professional/Dashboard.module.css'
import { Box, Button, Paper, useTheme } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { PageContainer } from '@toolpad/core/PageContainer';

const projectTitleStyle = {
  margin: '0px',
  padding: '0px',
  fontSize: '18px',
  color: '#344649'
};

const ProfessionalDashboard = () => {
    return (
      <>
        <PageContainer className="container" maxWidth={false} sx={{width:"100%", "@media (min-width: 0px)": { paddingRight: "25px", paddingLeft: "25px" }, margin: "0px"}}>
        {TitleCard('Rating', '4/5')}
        {TitleCard('Projects Completed', '4/5')}
        {TitleCard('Current Projects', '4/5')}
        {TitleCard('Certifications', '4/5')}

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
                <ProjectCard
                    projectName="Current Project Name 1"
                    projectDescription="Project 1 Description"
                />
                <ProjectCard
                    projectName="Current Project Name 2"
                    projectDescription="Project 2 Description"
                />
                <ProjectCard
                    projectName="Current Project Name 3"
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
      </>
    );
}

export default ProfessionalDashboard;