import React, { useState, useEffect } from "react";
import { apiGet } from '../api';
import { styled } from '@mui/material/styles';

import BrowseCards from './BrowseCards';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';

// import Drawer from '@mui/material/Drawer';
// import DrawerHeader from '@mui/material/DrawerHeader';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import SearchBar from '../components/SearchBar';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SearchIcon from '@mui/icons-material/Search';
import Typography from "@mui/material/Typography";


const drawerWidth = '30%';
const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
  });
  
  const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
  
  
  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme }) => ({
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      variants: [
        {
          props: ({ open }) => open,
          style: {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
          },
        },
        {
          props: ({ open }) => !open,
          style: {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
          },
        },
      ],
    }),
  );

function SidePanel({ projectID, onSelectProject }) {
    const [allProjects, setAllProjects] = React.useState([]);
    // const [projectID, setSelectProjectID] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(true);
    const [searchResults, setSearch] = React.useState([]);
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
      };
    
      const handleDrawerClose = () => {
        setOpen(false);
      };
    React.useEffect(() => {
        apiGet('/project/listall', )
        // .then(response => response.json())
        .then(data => {
            if (!data.error) {
                setAllProjects(data);
                setSearch(data);
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
        return <Box sx={{width: '100%', height: '100%'}}><Box sx={{display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh', // Full viewport height
          textAlign: 'center'}}><Typography variant="h6" component="h1" gutterBottom>
        Loading projects...
        </Typography></Box></Box>
    }

    return (
        <Drawer variant="permanent" open={open} sx={{ backgroundColour: 'none', paddingLeft:'25px'}}>
        <DrawerHeader></DrawerHeader>
        <DrawerHeader>
          {open === false ? 
          <Stack direction="row">
            <IconButton onClick={handleDrawerOpen}><SearchIcon /><ChevronRightIcon />  </IconButton>
          </Stack> : 
          <Stack direction="row" sx={{width:'100%'}}>
            <SearchBar allProjects={allProjects} setSearch={setSearch}> </SearchBar><IconButton onClick={handleDrawerClose}><ChevronLeftIcon/></IconButton>
          </Stack>
          }
        </DrawerHeader>
        <Divider />
        <Box sx={{ overflow: 'auto', width: '100%'}}>
        
        {open === false ? <div></div>: 
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
              
              {console.log(searchResults)}
              {searchResults.length !== 0 && searchResults.map((project, idx) => (
              <ListItem key={idx} id={project.projectId} onClick={() => onSelectProject(project.projectId)} 
              className={`project-card ${projectID === project.projectId ? 'selected' : ''}`} disablePadding >
                  <BrowseCards project={project} />
                  {/* ok */}
              </ListItem>
              ))}
              {searchResults.length == 0 && <ListItem sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}> Currently No Projects Found</ListItem>}
              </List>
            }
        </Box>
      </Drawer>
    );
}

export default SidePanel;
