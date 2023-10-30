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
import decodeJWT from '../decodeJWT.js';
import { getProfessionalProjectsFromStatus, getProjects } from '../helpers.js';

const projectTitleStyle = {
  margin: '0px',
  padding: '0px',
  fontSize: '18px',
  color: '#344649'
};

const ProfessionalDashboard = () => {
    const [activeProjects, setActiveProjects] = React.useState([]);
    const [pendingProjects, setPendingProjects] = React.useState([]);
    const [completedProjects, setCompletedProjects] = React.useState([]);

    const [ownUserId, setOwnUserId] = React.useState();

    React.useEffect(() => {
        const getToken = localStorage.getItem("token");
        console.log(getToken)
        if (getToken != null) {
            const tokenData = decodeJWT(getToken);
            setOwnUserId(tokenData.userId)
        }
       
    }, []);

    React.useEffect(() => {
        console.log("in here", ownUserId)
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
        }
    }, [ownUserId]);

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

        <Accordion defaultExpanded>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                sx={{margin: '0px'}}
                >
                <div style={projectTitleStyle}>Pending Projects</div>
            </AccordionSummary>
            <AccordionDetails>
                {pendingProjects.map((project, idx) => (
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
                {completedProjects.map((project, idx) => (
                        <ProjectCard
                            key={idx}
                            projectName={project.projectName}
                            projectDescription={project.projectDescription}
                            projectId={project.projectId}
                        />
                    ))}
            </AccordionDetails>
        </Accordion>
        </PageContainer>
      </>
    );
}

export default ProfessionalDashboard;