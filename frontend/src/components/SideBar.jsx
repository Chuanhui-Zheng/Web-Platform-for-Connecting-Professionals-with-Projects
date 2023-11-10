import React from "react";
import { apiGet } from '../api';
import BrowseCards from './BrowseCards';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';


function SideBar({ projectID, onSelectProject }) {
    const [allProjects, setAllProjects] = React.useState([{}]);
    // const [projectID, setSelectProjectID] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        // const glob = localStorage.getItem('token');
        // setToken(glob);
        // if (glob != null) {
        //   const tokenData = decodeJWT(token);
        //   setUserId(tokenData.userId)
        //   setUserType(tokenData.userType)
        // }
    
        apiGet('/project/listall', )
        .then(data => {
            if (!data.error) {
                setAllProjects(data);
                console.log("project details:", data)
            } else {
                console.error("Error fetching project list:", data.error);
            }
        })
        .catch(err => {
            console.error("Failed to fetch project list:", err);
        }).finally(() => setIsLoading(false));
    }, []);

    if (isLoading) {
        return <div>Loading projects...</div>;
    }

    return (
        <List>
        {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding >
            <ListItemButton sx={{backgroundColour:'grey'}}>
                <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
            </ListItemButton>
            </ListItem>
        ))} */}

        {console.log(allProjects)}
        {allProjects.length !== 0 && allProjects.map((project, idx) => (
        <ListItem key={idx} id={project.projectId} onClick={() => onSelectProject(project.projectId)} 
        className={`project-card ${projectID === project.projectId ? 'selected' : ''}`} disablePadding >
            <BrowseCards project={project} />
            {/* ok */}
        </ListItem>
        ))}
        {allProjects.length == 0 && <ListItem sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}> Currently No Projects</ListItem>}
        </List>
    );
}

export default SideBar;
