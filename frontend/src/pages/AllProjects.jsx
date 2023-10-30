import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import DateRangeIcon from '@mui/icons-material/DateRange';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GroupsIcon from '@mui/icons-material/Groups';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import { PageContainer } from '@toolpad/core/PageContainer';
import Stack from '@mui/material/Stack';

import AppBar from '@mui/material/AppBar';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import Chip from '@mui/material/Chip';
// import { PageContainer } from '@toolpad/core/PageContainer';
// import { AppProvider } from '@toolpad/core/AppProvider';
import { apiGet } from '../api';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import ProjectDetailWindow from '../components/ProjectDetailWindow';
import SideBar from '../components/SideBar';
import Dummy from '../components/Dummy';

const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  margin: '0px',
  gap: '10px'
};

const secondaryStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '0px',
  // paddingLeft: '32px'
};


const StyledChip = styled(Chip)({
  margin: "4px",
  "&:hover": {
    backgroundColor: "#e0e0e0"
  }
});

const drawerWidth = '30%';


const professionalButtons = [
  <Button key="status" sx={{backgroundColor: "#21b6ae"}}>Status</Button>,
  <Button key="status" sx={{backgroundColor: "grey"}}>View More</Button>
];

const statusOptions = ['Pending', 'Completed', 'Closed'];

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

export default function AllProjects() {
  const [open, setOpen] = React.useState(false);
  const [allProjects, setAllProjects] = React.useState([{}]);

  React.useEffect(() => {
    apiGet("/project/listall",)
    .then((data) => {
        if (!data.error) {
          setAllProjects(data);
          // console.log("project details:", allProjects)
          console.log("project details:", data)
        } else {
            throw new Error("Get Projects");
        }
    })
    .catch(() => {
        alert("not valid.");
    });
  }, []);

  const [projectID, setSelectProjectID] = React.useState(null);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSelectProject = (projectId) => {
      setSelectProjectID(projectId);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* <PageContainer className="container" maxWidth={false} sx={{width:"100%", "@media (min-width: 0px)": { paddingRight: "25px", paddingLeft: "25px" }, margin: "0px"}}> */}

      {/* <CssBaseline /> */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Header></Header>
      </AppBar>
      <Drawer variant="permanent" open={open} sx={{ backgroundColour: 'none', paddingLeft:'25px'}}>
        <DrawerHeader></DrawerHeader>
        <DrawerHeader>
          {open === false ? 
          <Stack direction="row">
            <IconButton onClick={handleDrawerOpen}><SearchIcon /><ChevronRightIcon />  </IconButton>
          </Stack> : 
          <Stack direction="row">
            <SearchBar> </SearchBar><IconButton onClick={handleDrawerClose}><ChevronLeftIcon/></IconButton>
          </Stack>
          }
        </DrawerHeader>
        <Divider />
        <Box sx={{ overflow: 'auto', width: '100%'}}>
        
        {open === false ? <div></div>: 
              <SideBar projectID={projectID} onSelectProject={handleSelectProject} />
              
            }
        </Box>
      </Drawer>
      {console.log(projectID)}
      {/* <ProjectDetailWindow projectID={parseInt(projectID)} token={token}/> */}
      <ProjectDetailWindow projectID={projectID} />
      {/* </PageContainer> */}
    </Box>
  );
}
