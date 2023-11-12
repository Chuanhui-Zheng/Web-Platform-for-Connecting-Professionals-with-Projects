import React, { useState, useEffect } from 'react';
import { apiGet, apiPut, apiPost  } from '../api';
import { styled } from '@mui/material/styles';
import { useNavigate, Navigate } from 'react-router-dom';
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
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import VisuallyHiddenInput from "../components/VisuallyHiddenInput";
import { fileToDataUrl } from '../helpers';
import CustomisedRating from './CustomisedRating'; 
import StarIcon from '@mui/icons-material/Star';
import PaginationCards from './Pagination';
import SnackbarAlert from './SnackbarAlert';
import LoadingPage from "../pages/ErrorPages/LoadingPage";
import ProjectApplicantList from './ProjectProfessionalList';
import DialogContent from '@mui/material/DialogContent';
import DynamicFormDialog from './FormDialog';
import { useProject } from '../ProjectContext';

// Style compontents
const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  margin: '0px',
  gap: '10px',
  padding: '10px 30px'
};
  
const secondaryStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '0px',
  padding: '0px 30px'
};

const StyledChip = styled(Chip)({
  margin: "4px",
  "&:hover": {
    backgroundColor: "#e0e0e0"
  }
});
  
// Status options
const statusCompOptions = ['Active', 'Completed'];
const statusProfOptions = ['Apply', 'Pending', 'Approved', 'Complete'];




export default function ProjectDetailWindow({ projectID }) {
  const navigate = useNavigate();
  const [projectInfo, setProjectInfo] = useState(null);
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = React.useState('');
  const [userType, setUserType] = React.useState('');
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [selectedIndex2, setSelectedIndex2] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [isCompleted, setIsCompleted] = React.useState(false);
  const [certificate, setCertificate]= React.useState(null);
  const [token, setToken]= React.useState('');
  const [approved, setApproved] = React.useState(false);
  const [pending, setPending] = React.useState(true);
  const [showSnackBar, setShowSnackbar] = React.useState(false);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const reloadProject = useProject();

  const toggleSnackbar = () => {
      setShowSnackbar(!showSnackBar)
  }

  useEffect(() => {
    const glob = localStorage.getItem('token');
    setToken(glob);
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
          if (data.projectStatus === "Complete") {
            setIsCompleted(true)
          }
          console.log("details:", data)
          console.log("details:", data.listOfApplicants)
          
          setSelectedIndex2(0)

          // STATUS: check if professional has applied
          data.listOfApplicants.forEach(prof => {
            if (userId === prof.professionalId) {
              setSelectedIndex2(1)
            } 
          })
          
          // STATUS: check if professional has been approved

          data.listOfProfessionals.forEach(prof => {
            if (userId === prof.professionalId) {
              setSelectedIndex2(2)
              setApproved(true)
              setPending(false)
            } 
          })

          // if project complete
          if (data.projectStatus === 'Complete') {
            setSelectedIndex(1)
            setSelectedIndex2(3)
            setPending(false)
          }
        } else {
          console.error("Error fetching project list:", data.error);
        }
      })
      .catch((err) => {
          alert(err);
          console.error("Failed to fetch project:", err);
      }).finally(() => setIsLoading(false));
    }
  }, [projectID, reloadProject]); // Refetch details every time the project ID changes


    const handleMenuItemClick = (event, index) => {
      setSelectedIndex(index);
      console.log(event)
      if (index == 1) {
        // complete project
        const projectId = projectID;
        apiPut("/project/company/complete", {projectId})
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
    const professionalId = userId;
    const projectId = projectID;
    if (selectedIndex === 0) {
      setSelectedIndex2(1);
      apiPost("/project/professional/apply", { professionalId, projectId })
        .then((data) => {
          if (!data.error) {
            console.log(data);
            setShowSnackbar(true);
          } else {
            throw new Error("Project Apply Failed");
          }
        })
        .catch((err) => {
          alert("Project Apply are not valid.", err);
        });
    } else {
      setSelectedIndex2(0);
      apiPost("/project/professional/leave", { professionalId, projectId })
        .then((data) => {
          if (!data.error) {
            console.log(data);
          } else {
            throw new Error("Project leave Failed");
          }
        })
        .catch((err) => {
          alert("Project leave are not valid.", err);
        });
    }
  };
  const navigateEdit = (event) => {
    navigate(`/projectpage/:${projectID}/edit`);
  };
  
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the first uploaded file
    fileToDataUrl(file).then((dataUrl) => {
      setCertificate(dataUrl);
    }).catch((error) => {
      console.error("Error converting file to data URL:", error);
    });
  };
  
  useEffect(() => {
    if (certificate) {
      console.log("calling giveCert api", certificate);
      apiPost("/giveCertificate", {
        companyId: projectInfo.pCompanyId,
        professionalCertificate: certificate,
        projectId: projectID
      }).then((data) => {
        if (!data.error) {
          console.log("give cert api", data);
        } else {
          throw new Error("give Cert Failed");
        }
      })
      .catch(() => {
        alert("cert not valid.");
      });
    }
  }, [certificate]);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };
  
  const companybuttons = [
    <Button key="EditProjectBtn" sx={{backgroundColor: "orange"}} onClick={handleOpenDialog}>Edit Project</Button>,
    // <Button key="company-status">Project Status</Button>,`/profile/:${tokenData.userId}`
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
    </Button>,
    // <Button key="RateProjectBtn" sx={{ backgroundColor: "orange" }} onClick={() => navigate(`/project/${projectID}/rate`)}>Rate Project</Button>

  ];
  
  const professionalButtons = [
    <Button key="status" sx={{backgroundColor: "#21b6ae"}} onClick={handleApply}>{statusProfOptions[selectedIndex2]}</Button>
    // <Button key="EditProjectBtn" sx={{backgroundColor: "orange"}} onClick={() => navigate(`/project/${projectID}/rate`)}>Rate Project</Button>
  ];
  
  if (!projectInfo) {
    return (
      <Box sx={{width: '100%', height: '100%'}}>
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center'}}>
          <Typography variant="h6" component="h1" gutterBottom>
            Welcome! Select a project to view full details!
          </Typography>
        </Box>
      </Box>
    );
  }
  
  if (isLoading) {
    return (
      // <Box sx={{width: '100%', height: '100%'}}>
      //   <Box 
      //     sx={{
      //       display: 'flex',
      //       alignItems: 'center',
      //       justifyContent: 'center',
      //       height: '100vh', // Full viewport height
      //       textAlign: 'center'
      //     }}
      //   >
      //     <Typography variant="h6" component="h1" gutterBottom>
      //       Loading project details...
      //     </Typography>
      //   </Box>
      // </Box>
      <LoadingPage />
    );
  } 

  return (
    <Box sx={{ width: '100%', bgcolor: '#F5F5F5', borderRadius: '20px' }}>


      <Box component="main" sx={{ flexGrow: 1, p: 3, width: '100%' }}>
        <div style={headerStyle}>
          <Avatar sx={{ width: 32, height: 32 }} />
          <Typography variant="h4" component="h1" gutterBottom>
            <b>{projectInfo.projectName}</b>
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: '550' }}>{projectInfo.projectAvgRating.toFixed(1)}</Typography>
          <StarIcon sx={{ color: 'orange', fontSize: 25 }}></StarIcon>
          <Typography variant="h5" sx={{ fontWeight: '350', color: 'lightgray' }}>({Object.keys(projectInfo.listOfProjectRatings).length})</Typography>
        </div>
  
        <Box style={secondaryStyle}>
          <Box>
            <Typography variant="h6" color={'#7D8E95'} component="h1" gutterBottom>
              {projectInfo.projectCompany}
            </Typography>
            
            <Container sx={{ flexDirection: 'row' }}>
              <Box display="flex" alignItems="center" mb={1}>
                <BusinessCenterIcon style={{ marginRight: 8 }} />
                <Typography variant="body2" color="textSecondary">
                  {projectInfo.projectCategory}
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
                <StyledChip label={skill} key={idx} />
              ))}
            </Box>
          </Box>
  
          {userType === 'company' && userId === projectInfo.pCompanyId && !isCompleted ? (
            <ButtonGroup orientation="vertical" aria-label="Vertical button group" variant="contained">
              {companybuttons}
            </ButtonGroup>
          ) : userType === 'company' && userId === projectInfo.pCompanyId && isCompleted ? (
            <ButtonGroup>
              <Button sx={{ margin: '30px 0 0 0' }} className="upload" component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                Give Certificate
                <VisuallyHiddenInput type="file" accept="application/pdf" name="companyLogo" value='' onChange={handleFileChange} />
              </Button>
              
              <Button key="RateProjectBtn" sx={{ backgroundColor: "orange" }} onClick={() => navigate(`/project/${projectID}/rate`)}>Rate Project</Button>
            </ButtonGroup>
          ) : userType === 'professional' ? (
            <ButtonGroup orientation="vertical" aria-label="Vertical button group" variant="contained">
              {professionalButtons}
              {pending ? null : <Button key="EditProjectBtn" sx={{ backgroundColor: "orange" }} onClick={() => navigate(`/project/${projectID}/rate`)}>Rate Project</Button>}
            </ButtonGroup>
          ) : (
            <ButtonGroup orientation="vertical" aria-label="Vertical button group" variant="contained">
            </ButtonGroup>
          )}
  
          <Popper sx={{ zIndex: 1 }} open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList id="split-button-menu" autoFocusItem>
                      {statusCompOptions.map((option, index) => (
                        <MenuItem key={option} selected={index === selectedIndex} onClick={(event) => handleMenuItemClick(event, index)}>
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
        <DialogContent dividers>
        {userId === projectInfo.pCompanyId && !isCompleted ? 
        <Box>
          <Typography variant="h5" component="h2" gutterBottom>
              Applicant List
            </Typography>
            
          <ProjectApplicantList projectId={projectID} listType={'applicant'}/><br></br>
        </Box> :<Box></Box>}
        {approved === true || (userType === 'company' && userId === projectInfo.pCompanyId) ? (
          <Box>
          <Typography variant="h5" component="h2" gutterBottom>
            Meet the Team
          </Typography>
          {/* <Box mb={8}>Currently No Members</Box> */}
          <ProjectApplicantList projectId={projectID} listType={'professionals'}/><br></br>
          <Box sx={{ width: '100%', bgcolor: '#E7CCCC', padding:'15px',margin:'20px 0px', borderRadius: '20px' }}> 
            <Typography variant="h5" component="h2" gutterBottom>
              Confidential Information
            </Typography>
            <Typography color='text.secondary' sx={{ marginBottom: 2 }}>
              {projectInfo.projectConfidentialInformation}
            </Typography>
            </Box>
          </Box>
        ) : (
          <Box></Box>
        )}
        <Box sx={{ width: '100%', bgcolor: '#F1EEDB', padding:'15px',margin:'20px 0px', borderRadius: '20px' }}> 
        <Typography variant="h5" component="h2" gutterBottom>
          Project Description
        </Typography>
        <Typography color='text.secondary' sx={{ marginBottom: 2 }}>
          {projectInfo.projectDescription}
        </Typography>
        </Box>
        <Box sx={{ width: '100%', bgcolor: '#F1EEDB', padding:'15px',margin:'20px 0px', borderRadius: '20px' }}> 
        <Typography variant="h5" component="h2" gutterBottom>
          Key Responsibilities
        </Typography >
        {/* <List sx={{ listStyleType: 'disc', padding: '10px 40px' }}> */}
          {/* <ListItem sx={{ display: 'list-item' }}>
          check
        </ListItem>
        <ListItem sx={{ display: 'list-item' }}>
          check
        </ListItem>
        <ListItem sx={{ display: 'list-item' }}>
          check
        </ListItem> */}
          {/* <ListItem color='text.secondary'> */}
          <Typography color='text.secondary' sx={{ marginBottom: 2 }}>
          {projectInfo.projectKeyResponsibilities}
        </Typography>
          {/* </ListItem>
        </List> */}
        </Box>
        <Box sx={{ width: '100%', bgcolor: '#F1EEDB', padding:'15px', margin:'20px 0px', borderRadius: '20px' }}> 
        <Typography variant="h5" component="h2" gutterBottom>
          Objectives
        </Typography>
        
        <Typography color='text.secondary' sx={{ marginBottom: 2 }}>
          {projectInfo.projectObjectives}
        </Typography>
        </Box>
        <Typography variant="h5" component="h2" gutterBottom>
          Contact: {projectInfo.contactEmail}
        </Typography>
        <br></br>
        <Divider />
        <br></br>
        {/* REVIEWS IMPLEMENTED HERE */}
        <Typography variant="h5" component="h2" gutterBottom>Reviews</Typography>
        <PaginationCards reviews={projectInfo.listOfProjectRatings} type="project"></PaginationCards>
        </DialogContent>
        {/* EDIT PROJECT FORM DIALOG HERE */}
        <DynamicFormDialog
            open={isDialogOpen}
            onClose={handleCloseDialog}
            userId={projectID}
            userType="project"
            title={`Edit Project`}
        />
      </Box>
      {showSnackBar && <SnackbarAlert message={'Successfully applied to project'} toggleSuccess={toggleSnackbar} />}
    </Box>
  );  
}