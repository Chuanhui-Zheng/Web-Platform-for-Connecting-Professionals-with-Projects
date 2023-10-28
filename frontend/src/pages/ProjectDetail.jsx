import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Avatar from '@mui/material/Avatar';
import DateRangeIcon from '@mui/icons-material/DateRange';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GroupsIcon from '@mui/icons-material/Groups';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import AppBar from '@mui/material/AppBar';
import Chip from '@mui/material/Chip';
// import { PageContainer } from '@toolpad/core/PageContainer';
// import { AppProvider } from '@toolpad/core/AppProvider';
import { apiGet } from '../api';
import { useLocation } from 'react-router-dom';

import Header from '../components/Header';
import { useNavigate, useParams } from "react-router-dom";

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


const professionalButtons = [
  <Button key="status" sx={{backgroundColor: "#21b6ae"}}>Status</Button>,
];

const statusOptions = ['Pending', 'Completed', 'Close'];


export default function ProjectDetail() {
    const { projectID } = useParams();
    const navigate = useNavigate();
    // const navigate = useLocation();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const [projectInfo, setprojectInfo] = React.useState([]);
    const currentUrl = window.location.href;
    const [projectId, setProjectId] = React.useState('');

    React.useEffect(() => {
      // const glob = localStorage.getItem('token');
      // setToken(glob);
      // fetchProjectDeets();
      setProjectId(currentUrl.split('/').pop())
      console.log(currentUrl.split('/').pop())
      apiGet("/project/details", `projectId=${projectID}`)
      .then((data) => {
          console.log(data);
          if (!data.error) {
            setprojectInfo(data);
            console.log("details:", data)
          } else {
              throw new Error("Get Project details");
          }
      })
      .catch(() => {
          alert("not valid.");
      });
    }, []);


    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
    };

    const companybuttons = [
        <Button key="EditProjectBtn" sx={{backgroundColor: "orange"}} onClick={navigate}>Edit Project</Button>,
        <Button key="candidateList" sx={{backgroundColor: "grey"}}>Candidate List</Button>,
        // <Button key="company-status">Project Status</Button>,
        <Button
            sx={{backgroundColor: "#21b6ae"}}
            key="companyStatus"        
            size="small"
            ref={anchorRef}
            aria-controls={open ? 'split-button-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
        >
        {statusOptions[selectedIndex]}<ArrowDropDownIcon />
        </Button>
      ];

  return (
    <Box sx={{ display: 'flex' }}>
      
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Header></Header>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

        <div style={headerStyle}>
          <Avatar sx={{ width: 32, height: 32 }} />
          <Typography variant="h4" component="h1" gutterBottom>
            <b> {projectInfo.projectName}</b>
          </Typography>
        </div>
        
        <Box style={secondaryStyle}>
          <Box>
            <Typography variant="h6" component="h1" gutterBottom>
            {projectInfo.projectCompany}
            </Typography>

            <Container sx={{flexDirection: 'row'}}>
              <Box display="flex" alignItems="center" mb={1}>
                <BusinessCenterIcon style={{ marginRight: 8 }} />
                <Typography variant="body2" color="textSecondary">
                {projectInfo.Category}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={1}>
                <DateRangeIcon style={{ marginRight: 8 }} />
                <Typography variant="body2" color="textSecondary">
                {projectInfo.projectStartDate} - {projectInfo.projectEndDate}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={1}>
                <LocationOnIcon style={{ marginRight: 8 }} />
                <Typography variant="body2" color="textSecondary">
                {projectInfo.projectLocation}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={1}>
                <GroupsIcon style={{ marginRight: 8 }} />
                <Typography variant="body2" color="textSecondary">
                {projectInfo.professionalsWanted}
                </Typography>
              </Box>
            </Container>

            <Typography variant="body2" color="textSecondary" paragraph>
              Required Skills:
            </Typography>
            <Box mb={2}>
            {/* {projectInfo.projectSkills.map((skill, idx) => (
              <StyledChip key={idx} label={skill} />
            ))} */}
            </Box>


          </Box>
          <ButtonGroup
            orientation="vertical"
            aria-label="Vertical button group"
            variant="contained"
          >
            {companybuttons}
          </ButtonGroup>
          <Popper
        sx={{ zIndex: 1 }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {statusOptions.map((option, index) => (
                    <MenuItem
                      key={option}
                      disabled={index === 2}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
        </Box>

        <Typography variant="h5" component="h2" gutterBottom>
          Project Description
        </Typography>
        <Typography sx={{ marginBottom: 2 }}>
          {projectInfo.projectDescription}
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Key Responsibilities
        </Typography>
        <List sx={{ listStyleType: 'disc', padding: '10px 40px' }}>
          {/* <ListItem sx={{ display: 'list-item' }}>
            check
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            check
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            check
          </ListItem> */}
          <ListItem>
            {projectInfo.projectKeyResponsibilities}
          </ListItem>
          </List>
          <Typography variant="h5" component="h2" gutterBottom>
          Objectives
        </Typography>
        <Typography sx={{ marginBottom: 2 }}>
        {projectInfo.projectObjectives}
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
        {projectInfo.contactEmail}
        </Typography>
      </Box>
    </Box>
  );
}
