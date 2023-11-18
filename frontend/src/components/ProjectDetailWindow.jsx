import React, { useState, useEffect } from 'react';
import { apiGet, apiPut, apiPost  } from '../api';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
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
import Chip from '@mui/material/Chip';
import decodeJWT from '../decodeJWT';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import VisuallyHiddenInput from "../components/VisuallyHiddenInput";
import { fileToDataUrl } from '../helpers';
import StarIcon from '@mui/icons-material/Star';
import PaginationCards from './Pagination';
import SnackbarAlert from './SnackbarAlert';
import LoadingPage from "../pages/ErrorPages/LoadingPage";
import ProjectApplicantList from './ProjectProfessionalList';
import DialogContent from '@mui/material/DialogContent';
import DynamicFormDialog from './FormDialog';
import { useProject } from '../context/ProjectContext';
import ErrorPopup from './ErrorPopup';
import presentationscreen from '../assets/presentationscreen2.png';
import PropTypes from 'prop-types';

// Style components
const headerStyle = {
  display: 'flex',
  alignItems: 'flex-end',
  margin: '0px',
  padding: '10px 30px'
};

// Styled components
const secondaryStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '0px',
  padding: '0px 30px'
};
// Styled components
const imgStyle = {
  position:'absolute',
};

// Styled components
const StyledChip = styled(Chip)({
  margin: "4px",
  "&:hover": {
    backgroundColor: "#e0e0e0"
  }
});
  
// Status options
const statusCompOptions = ['Active', 'Completed'];
const statusProfOptions = ['Apply', 'Pending', 'Approved', 'Complete'];


/**
 * 
 * @param {*} param0 
 * @returns 
 * Component that the details of a project
 * This contins the project name, company, category, date range, location
 * number of people, skills, status buttons, description, responsibilities
 * objectives, contact and reviews
 */

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
  const [approved, setApproved] = React.useState(false);
  const [pending, setPending] = React.useState(true);
  const [showSnackBar, setShowSnackbar] = React.useState(false);
  const [snackBarMessage, setSnackBarMessage] = React.useState('');
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const reloadProject = useProject();
  const [errorMessage, setErrorMessage] = React.useState('');
  const [error, setError] = React.useState(false);
  const { triggerProjectUpdate } = useProject();

  /**
   * Function to toggle the error status to show a popup.
   */
  const toggleError = () => {
    setError(!error);
  }

  /**
   * Function to toggle the snackbar status to show a snackbar
   */
  const toggleSnackbar = () => {
      setShowSnackbar(!showSnackBar)
  }

  /**
   * Use effect to get a projects details depending on the permissions of a user.
   */
  useEffect(() => {
    const glob = localStorage.getItem('token');

    // Sets the user type
    if (glob != null) {
      const tokenData = decodeJWT(glob);
      setUserId(tokenData.userId)
      setUserType(tokenData.userType)
    
    // If projectId is valid we load the project.
    if (projectID) {
      setIsLoading(true);
      apiGet("/project/details", `projectId=${projectID}`)
      .then((data) => {
        if (!data.error) {
          setProjectInfo(data);
          setSkills(data.projectSkills)
          if (data.projectStatus === "Complete") {
            setIsCompleted(true)
          }
          setSelectedIndex2(0)

          // STATUS: check if professional has applied
          data.listOfApplicants.forEach(prof => {
            if (tokenData.userId === prof.professionalId) {
              setSelectedIndex2(1)
            } 
          })
          
          // STATUS: check if professional has been approved
          data.listOfProfessionals.forEach(prof => {
            if (tokenData.userId === prof.professionalId) {
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
          setErrorMessage(err)
          toggleError()
          console.error("Failed to fetch project:", err);
      }).finally(() => setIsLoading(false));
    }
    }
  }, [projectID, reloadProject]); // Refetch details every time the project ID changes

  /**
   * 
   * @param {*} event 
   * @param {*} index 
   * 
   * Function to change the status of a project used by a company to change the status to complete
   */
  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    if (index == 1) {
      // complete project
      const projectId = projectID;
      apiPut("/project/company/complete", {projectId})
      .then((data) =>{
        if (!data.error) {
          triggerProjectUpdate();
        } else {
          throw new Error("Project Complete Failed");
        }
      })
      .catch(() => {
        setErrorMessage("Project Complete are not valid.");
        toggleError();
        return
      });
    }
    setOpen(false);
  };

  /**
   * Function to toggle the status of a project.
   */
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  /**
   * 
   * @param {*} event 
   * @returns 
   * 
   * Function to close the event on click away.
   */
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
  };

  /**
   * Function to handle a professional applying or leave a project.
   */
  const handleApply = () => {
    const professionalId = userId;
    const projectId = projectID;
    if (selectedIndex === 0) {
      setSelectedIndex2(1);
      // Calls the apply api to let a professional apply.
      apiPost("/project/professional/apply", { professionalId, projectId })
        .then((data) => {
          if (!data.error) {
            setSnackBarMessage('Successfully applied to project')
            setShowSnackbar(true);
          } else {
            throw new Error("Project Apply Failed");
          }
        })
        .catch(() => {
          setErrorMessage("Already applied to project.");
          toggleError();
          return
        });
    } else {
      // If a professional wants to leave calls the leave API.
      setSelectedIndex2(0);
      apiPost("/project/professional/leave", { professionalId, projectId })
        .then((data) => {
          if (data.error) {
            throw new Error("Project leave Failed");
          }
        })
        .catch(() => {
          setErrorMessage("Project leave are not valid.");
          toggleError();
          return
        });
    }
  };
  
  /**
   * Handle File upload for certificate
   * 
   */ 
  const handleFileChange = (event) => {
    const file = event.target.files[0]; 
    fileToDataUrl(file).then((dataUrl) => {
      setCertificate(dataUrl);
    }).catch((error) => {
      console.error("Error converting file to data URL:", error);
    });
  };
  
  /**
   * Handle certificatite upload API
   */
  useEffect(() => {
    if (certificate) {
      apiPost("/giveCertificate", {
        companyId: projectInfo.pCompanyId,
        professionalCertificate: certificate,
        projectId: projectID
      }).then((data) => {
        if (!data.error) {
          setSnackBarMessage('Certificate uploaded')
          setShowSnackbar(true);
        } else {
          setErrorMessage("Failed to give certification, please try again");
          toggleError();
          throw new Error("give Cert Failed");
        }
      })
      .catch(() => {
        setErrorMessage("Certification not available not valid.");
        toggleError();
        alert("cert not valid.");
      });
    }
  }, [certificate]);

  /**
   * Function to open dialog for editing a project
   */
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  /**
   * Function to close dialog for editing a project.
   */
  const handleCloseDialog = () => {
      setIsDialogOpen(false);
  };
  
  const companybuttons = [
    <Button key="EditProjectBtn" sx={{backgroundColor: "orange"}} onClick={handleOpenDialog}>Edit Project</Button>,
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
  ];
  
  /**
   * Button only for professionals to apply to a project
   */
  const professionalButtons = [
    <Button key="status" sx={{backgroundColor: "#21b6ae"}} onClick={handleApply}>{statusProfOptions[selectedIndex2]}</Button>
  ];
  
  // check if project has been selected
  if (!projectInfo) {
    return (
      <Box sx={{width: '100%', height: '100%', background:'rgba(255,255,255, 0.3)', boxShadow: '0 4px 6px rgba(0,0,0,0.1)',border:'1px solid #fff' , borderRadius:'20px'}}><Box sx={{display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center', position: 'relative'}}>
        <img src={presentationscreen} style={imgStyle} />
        <Typography variant="h6" color="black" component="h1" position="relative" gutterBottom>
          Welcome! <Typography>Select a Project to get started!</Typography><Box color='#F5F5F5'><br></br>.<br></br>.<br></br>.<br></br>.</Box>
      </Typography>
      </Box></Box>
    );
  }
  
  // check for projects all loaded
  if (isLoading) {
    return (
      <LoadingPage />
    );
  } 

  return (
    <Box sx={{ width: '100%', bgcolor: '#F5F5F5', borderRadius: '20px' }}>
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: '100%' }}>
        <div style={headerStyle}>
          <Typography variant="h4" component="h1">
            <b>{projectInfo.projectName}</b>
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: '550', pl:2, pb:0.5}}>
            {projectInfo.projectAvgRating.toFixed(1)}
          </Typography>
          <StarIcon sx={{ color: 'orange', fontSize: 25, mb:1, ml:0.3, mr:0.3}}></StarIcon>
          <Typography variant="h5" sx={{ fontWeight: '350', color: 'lightgray', pb:0.5}}>
            ({Object.keys(projectInfo.listOfProjectRatings).length})
          </Typography>
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
            <ButtonGroup orientation="vertical" aria-label="Vertical button group">
              <Button sx={{ width:'100%', backgroundColor:'#077d17'}} className="upload" component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                Give Certificate
                <VisuallyHiddenInput type="file" accept="application/pdf" name="companyLogo" value='' onChange={handleFileChange} />
              </Button>
              
              <Button key="RateProjectBtn" sx={{ backgroundColor: "#eead67", pt:1.2, pb:1.2, color:'white' }} onClick={() => navigate(`/project/${projectID}/rate`)}>Rate Project</Button>
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
              
            <ProjectApplicantList projectId={projectID} listType={'applicant'} toggleSnackbar={toggleSnackbar} setSnackBarMessage={setSnackBarMessage}/><br></br>
          </Box> :<Box></Box>
        }
        {approved === true || (userType === 'company' && userId === projectInfo.pCompanyId) ? (
          <Box>
            <Typography variant="h5" component="h2" gutterBottom>
              Meet the Team
            </Typography>
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
          <Typography color='text.secondary' sx={{ marginBottom: 2 }}>
            {projectInfo.projectKeyResponsibilities}
          </Typography>
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
        <Typography variant="h5" component="h2" gutterBottom>Reviews</Typography>
        <PaginationCards reviews={projectInfo.listOfProjectRatings} type="project"></PaginationCards>
        </DialogContent>
        <DynamicFormDialog
          open={isDialogOpen}
          onClose={handleCloseDialog}
          userId={projectID}
          userType="project"
          title={`Edit Project`}
          snackbarToggle={toggleSnackbar}
          snackBarMessage={setSnackBarMessage}
        />
      </Box>
      {showSnackBar && <SnackbarAlert message={snackBarMessage} toggleSuccess={toggleSnackbar} />}
      {error && <ErrorPopup message={errorMessage} toggleError={toggleError}/>}
    </Box>
  );  
}

ProjectDetailWindow.propTypes = {
	projectID: PropTypes.number,
}
