import React, { useState, useEffect } from 'react';
import { apiGet } from '../api';
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
import decodeJWT from '../decodeJWT';
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
  
  
  const statusCompOptions = ['Pending', 'Completed'];
  const statusProfOptions = ['Apply', 'Pending'];
export default function Dummy({ projectID }) {
    const [projectInfo, setProjectInfo] = useState(null);
    const [skills, setSkills] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [userId, setUserId] = React.useState('');
    const [userType, setUserType] = React.useState('');
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [selectedIndex2, setSelectedIndex2] = React.useState(0);




    useEffect(() => {
        const glob = localStorage.getItem('token');
        if (glob != null) {
            const tokenData = decodeJWT(glob);
            setUserId(tokenData.userId)
            setUserType(tokenData.userType)
            console.log(tokenData.userType)
        }
        if (projectID) {
            setIsLoading(true);
            console.log(projectID)
            apiGet("/project/details", `projectId=${projectID}`)
            .then((data) => {
                console.log(data);
                if (!data.error) {
                    setProjectInfo(data);
                    setSkills(data.projectSkills)
                    console.log("details:", data)
                } else {
                    console.error("Error fetching project list:", data.error);
                }
            })
            .catch((err) => {
                alert(err);
                console.error("Failed to fetch project:", err);
            }).finally(() => setIsLoading(false));
        }
    }, [projectID]); // Refetch details every time the project ID changes


    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        console.log(event)
        if (index == 1) {
          // complete project
          apiPost("/project/company/complete", `projectId=${projectID}`)
          .then((data) =>{
              if (!data.error) {
                  console.log(data)
              } else {
                  throw new Error("Project Complete Failed");
              }
          })
          .catch((err) => {
              alert("Project Complete are not valid.", err)
          });
        }
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

    const handleApply = () => {
        if (selectedIndex === 0) {
            setSelectedIndex2(1);
        } else {
            setSelectedIndex2(0);
        }
        apiPost("/project/professional/apply", `professionalId=${userId}, projectId=${projectID}`)
          .then((data) =>{
              if (!data.error) {
                  console.log(data)
              } else {
                  throw new Error("Project Apply Failed");
              }
          })
          .catch((err) => {
              alert("Project Apply are not valid.", err)
          });
    };
    const companybuttons = [
        <Button key="EditProjectBtn" sx={{backgroundColor: "orange"}}>Edit Project</Button>,
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
        {statusCompOptions[selectedIndex]}<ArrowDropDownIcon />
        </Button>
      ];

    const professionalButtons = [
      <Button key="status" sx={{backgroundColor: "#21b6ae"}} onClick={handleApply}>{statusProfOptions[selectedIndex2]}</Button>
    ];

    if (isLoading) {
        return <div>Loading project details...</div>;
    }

    if (!projectInfo) {
        return <div>Select a project to view details</div>;
    }

    return (
        <Box sx={{ display: 'flex'}}>
      <Box component="main" sx={{flexGrow: 1, p: 3 }}>

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
            {skills.map((skill, idx) => (
              <StyledChip label={skill} />
            ))}


          </Box>
          {/* {projectInfo.companyId === userId ? <ButtonGroup
            orientation="vertical"
            aria-label="Vertical button group"
            variant="contained"
          >
            {companybuttons} 
          </ButtonGroup> : <ButtonGroup
            orientation="vertical"
            aria-label="Vertical button group"
            variant="contained"
          >
            {professionalButtons} 
          </ButtonGroup>} */}
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
                  {statusCompOptions.map((option, index) => (
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
      </Box>
    );
}