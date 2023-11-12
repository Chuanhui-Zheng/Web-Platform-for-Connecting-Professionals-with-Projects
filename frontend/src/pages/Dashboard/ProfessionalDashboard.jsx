import React from 'react';
import TitleCard from '../../components/Professional/Dashboard/TitleCard.jsx'; 
import ProjectCard from '../../components/Professional/Dashboard/ProjectCard.jsx';
import styles from '../../styles/Professional/Dashboard.module.css'
import { Box, Button, Paper, useTheme } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { PageContainer } from '@toolpad/core/PageContainer';
import DialogContent from '@mui/material/DialogContent';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Grid from '@mui/material/Grid2';
import ListItem from '@mui/material/ListItem';
import { useDashboard } from '../../DashboardContext.jsx';
import decodeJWT from '../../decodeJWT.js';
import { getProfessionalProjectsFromStatus, getProjects } from '../../helpers.js';
import ProjectCard1 from '../../components/Professional/Dashboard/ProjectCard1.jsx';

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

const ProfessionalDashboard = () => {
    const [activeProjects, setActiveProjects] = React.useState([]);
    const [pendingProjects, setPendingProjects] = React.useState([]);
    const [completedProjects, setCompletedProjects] = React.useState([]);
    const [value, setValue] = React.useState('active');
    const [ownUserId, setOwnUserId] = React.useState();

    const handleChange =  (event, newValue) => {
        setValue(newValue);
    };
    
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
      <Box sx={{bgcolor: '#F5F5F5', borderRadius: '20px', borderTopRightRadius: '20px', minHeight: '600px' }}>
        {TitleCard('Rating', '4/5')}
        {TitleCard('Projects Completed', '4/5')}
        {TitleCard('Current Projects', '4/5')}
        {TitleCard('Certifications', '4/5')}
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

        {/* <Accordion defaultExpanded>
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
        </Accordion> */}
        </Box>
      </>
    );
}

export default ProfessionalDashboard;