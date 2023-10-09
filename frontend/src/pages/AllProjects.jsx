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

import AppBar from '@mui/material/AppBar';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import Chip from '@mui/material/Chip';
// import { PageContainer } from '@toolpad/core/PageContainer';
// import { AppProvider } from '@toolpad/core/AppProvider';

import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import BrowseCards from '../components/BrowseCards';

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

// take this out
const companybuttons = [
  <Button key="EditProjectBtn" sx={{backgroundColor: "orange"}}>Edit Project</Button>,
  <Button key="candidateList" sx={{backgroundColor: "grey"}}>Candidate List</Button>,
  <Button key="company-status" sx={{backgroundColor: "#21b6ae"}}>Project Status</Button>,
];

const professionalButtons = [
  <Button key="status" sx={{backgroundColor: "#21b6ae"}}>Status</Button>,
  <Button key="status" sx={{backgroundColor: "grey"}}>View More</Button>
];

const statusOptions = ['Pending', 'Completed', 'Close'];

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

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Header></Header>
      </AppBar>
      <Drawer variant="permanent" open={open} sx={{ backgroundColour: 'none'}}>
        <DrawerHeader></DrawerHeader>
        <DrawerHeader>

            {open === false ? <SearchIcon />: 
                <Paper sx={{width:'100%'}}>
                <SearchBar> </SearchBar>
                </Paper>
            }
            {open === false ? <IconButton onClick={handleDrawerOpen}><ChevronRightIcon />  </IconButton>: 
            <IconButton onClick={handleDrawerClose}><ChevronLeftIcon/></IconButton>}
        </DrawerHeader>
        <Divider />
        {/* open === false ?  */}
        <Box sx={{ overflow: 'auto' }}>
        {/* <List>
          {allProjects.map((project) => (
            <ListItem key={project.id} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                  },
                  open
                    ? {
                        justifyContent: 'initial',
                      }
                    : {
                        justifyContent: 'center',
                      },
                ]}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: 'center',
                    },
                    open
                      ? {
                          mr: 3,
                        }
                      : {
                          mr: 'auto',
                        },
                  ]}
                >
                  {project.companyPhoto}
                </ListItemIcon>
                <ListItemText
                  primary={project.title}
                  sx={[
                    open
                      ? {
                          opacity: 1,
                        }
                      : {
                          opacity: 0,
                        },
                  ]}
                />


              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
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
                <ListItem disablePadding >
                  <BrowseCards></BrowseCards>
                </ListItem>
                <ListItem disablePadding >
                  <BrowseCards></BrowseCards>
                </ListItem>
                <ListItem disablePadding >
                  <BrowseCards></BrowseCards>
                </ListItem>
                <ListItem disablePadding >
                  <BrowseCards></BrowseCards>
                </ListItem>
                
              </List>
            //   <Paper>
            //     <BrowseCards></BrowseCards>
            //   </Paper>
              
            }
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

        <div style={headerStyle}>
          <Avatar sx={{ width: 32, height: 32 }} />
          <Typography variant="h4" component="h1" gutterBottom>
            <b> Project Name</b>
          </Typography>
        </div>
        

        <Box style={secondaryStyle}>
          <Box>
            <Typography variant="h6" component="h1" gutterBottom>
              Company Name
            </Typography>

            <Container sx={{flexDirection: 'row'}}>
              <Box display="flex" alignItems="center" mb={1}>
                <BusinessCenterIcon style={{ marginRight: 8 }} />
                <Typography variant="body2" color="textSecondary">
                  Category
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={1}>
                <DateRangeIcon style={{ marginRight: 8 }} />
                <Typography variant="body2" color="textSecondary">
                  Start Date - End Date
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={1}>
                <LocationOnIcon style={{ marginRight: 8 }} />
                <Typography variant="body2" color="textSecondary">
                  Location
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={1}>
                <GroupsIcon style={{ marginRight: 8 }} />
                <Typography variant="body2" color="textSecondary">
                  Number of People
                </Typography>
              </Box>
            </Container>

            <Typography variant="body2" color="textSecondary" paragraph>
              Required Skills:
            </Typography>
            <Box mb={2}>
              <StyledChip label="React" />
              <StyledChip label="Node.js" />
              <StyledChip label="MongoDB" />
              <StyledChip label="AWS" />
            </Box>


          </Box>
          <ButtonGroup
            orientation="vertical"
            aria-label="Vertical button group"
            variant="contained"
          >
            {professionalButtons}
          </ButtonGroup>
        </Box>

        <Typography variant="h5" component="h2" gutterBottom>
          Project Description
        </Typography>
        <Typography sx={{ marginBottom: 2 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
          enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
          Convallis convallis tellus id interdum velit laoreet id donec ultrices.
          Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
          nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
          leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
          feugiat vivamus at augue. At augue eget arcu dictum varius duis at
          consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
          sapien faucibus et molestie ac.
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Key Responsibilities
        </Typography>
        <List sx={{ listStyleType: 'disc', padding: '10px 40px' }}>
          <ListItem sx={{ display: 'list-item' }}>
            check
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            check
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            check
          </ListItem>
          </List>
          <Typography variant="h5" component="h2" gutterBottom>
          Objectives
        </Typography>
        <Typography sx={{ marginBottom: 2 }}>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
          eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
          neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
          tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
          sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
          tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
          gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
          et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
          tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Contact email
        </Typography>
      </Box>
    </Box>
  );
}
