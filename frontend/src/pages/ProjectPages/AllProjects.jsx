import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Header from '../../components/Header';
import ProjectDetailWindow from '../../components/ProjectDetailWindow';
import SidePanel from '../../components/SidePanel';

/**
 * 
 * @returns 
 * 
 * Browse Projects Page viewing all listed projects in side panel and project details.
 */
export default function AllProjects() {
  const [projectID, setSelectProjectID] = React.useState(null);

  // Keep track of which project has been clicked to view respective details
  const handleSelectProject = (projectId) => {
    setSelectProjectID(projectId);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Header></Header>
      </AppBar>
      <SidePanel projectID={projectID} onSelectProject={handleSelectProject} />
      <ProjectDetailWindow projectID={projectID} />
    </Box>
  );
}
