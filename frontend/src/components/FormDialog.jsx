import React, { useEffect, useState } from 'react';
import {
    useNavigate,
    useParams,
  } from 'react-router-dom';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
} from '@mui/material';
import { apiGet, apiPut } from '../api';
import { fileToDataUrl } from '../helpers';
import { useHeader } from '../HeaderContext';
import { useProfile } from '../ProfileContext';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import MultipleSelectChip from './MultiSelect'; // Assumes you have a custom multi-select component
import BasicSelect from './SingleSelect';
import MultipleSelectCategoryChip from './MultiCategorySelect';
import SnackbarAlert from './SnackbarAlert';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const DynamicFormDialog = ({ open, onClose, title, userId, userType }) => {
  const [formData, setFormData] = useState({});
  const [showSnackbar, setShowSnackbar] = useState(false);
  const navigate = useNavigate();
  const { triggerHeaderUpdate } = useHeader();
  const { triggerProfileUpdate } = useProfile();
  const [formConfigg, setFormConfigg] = useState([]);
  const [token, setToken] = React.useState('');

  useEffect(() => {
    if (userType === "professional") {
        apiGet("/user/details/professional", `id=${userId}`)
        .then((data) => {
            if (!data.error) {
                setFormData({
                    professionalFullName: data.professionalFullName,
                    professionalPassword: "",
                    professionalPhoneNumber: data.professionalPhoneNumber,
                    professionalDescription: data.professionalDescription,
                    professionalEducation: data.professionalEducation,
                    professionalWebsite: data.professionalWebsite,
                    professionalQualifications: data.professionalQualifications,
                    professionalSkills: data.professionalSkills,
                    professionalPhoto: data.professionalPhoto,
                })
            } else {
                throw new Error("Get Profile Failed");
            }
        })
        .catch(() => {
            alert("Profile fetch5 failed.");
        });
        setFormConfigg([
            { type: 'text', label: 'Full Name', name: 'professionalFullName' },
            { type: 'text', label: 'Password', name: 'professionalPassword' },
            { type: 'text', label: 'Phone Number', name: 'professionalPhoneNumber' },
            { type: 'textarea', label: 'Tell us About Yourself', name: 'professionalDescription' },
            { type: 'text', label: 'Qualifications', name: 'professionalQualifications' },
            { type: 'text', label: 'Education', name: 'professionalEducation' },
            { type: 'text', label: 'Website', name: 'professionalWebsite' },
            { type: 'file', label: 'Profile Photo', name: 'professionalPhoto' },
            { type: 'multiselect', label: 'Skills', name: 'professionalSkills'},
        ])
    } else if (userType === "company") {
        apiGet("/user/details/company", `id=${userId}`)
        .then((data) => {
            if (!data.error) {
                setFormData({
                    companyName: data.companyName,
                    companyPassword: "",
                    companyPhoneNumber: data.companyPhoneNumber,
                    companyWebsite: data.companyWebsite,
                    companyDescription: data.companyDescription,
                    companyLogo: data.companyLogo,
                })
            } else {
                throw new Error("Get Profile Failed");
            }
        })
        .catch(() => {
            alert("not valid.");
        });
        setFormConfigg([
            { type: 'text', label: 'Company Name', name: 'companyName' },
            { type: 'text', label: 'Password', name: 'companyPassword' },
            { type: 'text', label: 'Phone Number', name: 'companyPhoneNumber' },
            { type: 'text', label: 'Company Website', name: 'companyWebsite' },
            { type: 'textarea', label: 'Tell Us About Yourself', name: 'companyDescription' },
            { type: 'file', label: 'Company Logo', name: 'companyLogo' },
        ])
    } else if (userType === "project") {
        apiGet("/project/details", `projectId=${userId}`)
      .then((data) => {
        if (!data.error) {
            setFormData({
                projectName: data.projectName,
                contactEmail: data.contactEmail,
                projectStartDate: data.projectStartDate,
                projectEndDate: data.projectEndDate,
                projectCategory: data.projectCategory,
                projectLocation: data.projectLocation,
                professionalsWanted: data.professionalsWanted,
                projectKeyResponsibilities: data.projectKeyResponsibilities,
                projectSkills: data.projectSkills,
                projectDescription: data.projectDescription,
                projectObjectives: data.projectObjectives,
                projectConfidentialInformation: data.projectConfidentialInformation,
                projectStatus: data.projectStatus,
            })
        } else {
          console.error("Error fetching project list:", data.error);
        }
      })
      .catch((err) => {
          alert(err);
          console.error("Failed to fetch project:", err);
      })
        setFormConfigg([
            { type: 'text', label: 'Project Name', name: 'projectName' },
            { type: 'text', label: 'Contact Email', name: 'contactEmail' },
            { type: 'date', label: 'Start Date', name: 'projectStartDate' },
            { type: 'date', label: 'End Date', name: 'projectEndDate' },
            { type: 'text', label: 'Location', name: 'projectLocation' },
            { type: 'text', label: 'Number of Professionals Wanted', name: 'professionalsWanted' },
            { type: 'textarea', label: 'Key Responsibilities', name: 'projectKeyResponsibilities' },
            { type: 'multicategoryselect', label: 'Skills', name: 'projectSkills' },
            { type: 'multicategoryselect', label: 'Category', name: 'projectCategory' },
            { type: 'textarea', label: 'Project Description', name: 'projectDescription' },
            { type: 'textarea', label: 'Objective', name: 'projectObjectives' },
            { type: 'textarea', label: 'Confidential Information', name: 'projectConfidentialInformation' },
            { type: 'select', label: 'Project Status ', name: 'projectStatus' },
        ])
        const getToken = localStorage.getItem("token");
        setToken(getToken);
    }
  }, []);    


  // Handle input changes for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle input changes for date fields
  const handleDateChange = (newValue, fieldName) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: newValue ? newValue.format("YYYY-MM-DD") : "", // format as needed
    }));
  };

  // Handle file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the first uploaded file
    console.log(file)

    fileToDataUrl(file).then((dataUrl) => {
        if (userType === "professional") {
            setFormData((prevData) => ({
                ...prevData,
                professionalPhoto: dataUrl,
            }));
        } else if (userType === "company") {
            setFormData((prevData) => ({
                ...prevData,
                companyLogo: dataUrl,
            }));
        }
        
    }).catch((error) => {
        console.error("Error converting file to data URL:", error);
    });
  };

  const handleSkillsChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      professionalSkills: typeof value === 'string' ? value.split(',') : value,
    }));
  };

  const handleCategoriesChange = (value) => {
    setFormData((prevData) => ({
        ...prevData,
        projectCategory: typeof value === 'string' ? value.split(',') : value,
    }));
  }

  const handleStatusChange = (value) => {
    setFormData((prevData) => ({
        ...prevData,
        projectStatus: value,
    }));
  }

  const toggleSnackbar = () => {
    setShowSnackbar((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    console.log('Form submitted:', formData);
    e.preventDefault();
    if (userType === "professional") {
        const {
            professionalFullName,
            professionalPassword,
            professionalPhoneNumber,
            professionalDescription,
            professionalEducation,
            professionalWebsite,
            professionalQualifications,
            professionalSkills,
            professionalPhoto,
          } = formData
        
        apiPut("/edit/professional", {
            id: userId,
            professionalFullName,
            professionalPassword,
            professionalWebsite,
            professionalPhoneNumber,
            professionalDescription,
            professionalQualifications,
            professionalEducation,
            professionalSkills,
            professionalPhoto
        }).then((data) =>{
            console.log(data)
            if (!data.error) {
                onClose();
                toggleSnackbar();
                triggerHeaderUpdate();
                triggerProfileUpdate();
            } else {
                throw new Error("Edit Failed");
            }
        })
        .catch(() => {
            alert("Edit details are not valid.")
        });
    } else if (userType === "company") {
        const {
            companyName,
            companyPassword,
            companyPhoneNumber,
            companyWebsite,
            companyDescription,
            companyLogo,
        } = formData
        apiPut("/edit/company", {
            id: userId,
            companyName: companyName,
            companyPassword: companyPassword,
            companyPhoneNumber: companyPhoneNumber,
            companyWebsite: companyWebsite,
            companyDescription: companyDescription,
            companyLogo: companyLogo
        }).then((data) =>{
            console.log(data)
            if (!data.error) {
                onClose();
                toggleSnackbar();
                triggerHeaderUpdate();
                triggerProfileUpdate();
            } else {
                throw new Error("Edit Failed");
            }
        })
        .catch(() => {
            alert("Edit details are not valid.")
        });
    }  else if (userType === "project") {
        const {
            projectName,
            contactEmail,
            projectStartDate,
            projectEndDate,
            projectCategory,
            projectLocation,
            professionalsWanted,
            projectKeyResponsibilities,
            projectSkills,
            projectDescription,
            projectObjectives,
            projectConfidentialInformation,
            projectStatus,
        } = formData
        apiPut("/edit/project", {
            token: token,
            projectId: userId,
            projectName: projectName,
            contactEmail: contactEmail, 
            projectStartDate: projectStartDate,
            projectEndDate: projectEndDate,
            projectCategory: projectCategory,
            projectLocation: projectLocation,
            professionalsWanted: professionalsWanted,
            projectKeyResponsibilities: projectKeyResponsibilities, 
            projectSkills: projectSkills,
            projectDescription: projectDescription,
            projectObjectives: projectObjectives,
            projectConfidentialInformation: projectConfidentialInformation,
            projectStatus: projectStatus
        }).then((data) =>{
            if (!data.error) {
                onClose();
                toggleSnackbar();
                // triggerHeaderUpdate();
                // triggerProfileUpdate();
                // navigate('/dashboard', {state:{showSnackBar: true, message: 'Successfully edited project'}})
            } else {
                throw new Error("Edit Failed");
            }
        })
        .catch(() => {
            alert("Edit details are not valid.")
        });
    } 
    
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}> {title} 
            <IconButton
            edge="end"
            color="inherit"
            onClick={onClose}
            aria-label="close"
            sx={{ color: 'grey.500' }}
            >
            <CloseIcon />
            </IconButton>
        </DialogTitle>
        <DialogContent>
          {formConfigg.map((field) => {
            switch (field.type) {
              case 'text':
                return (
                  <TextField
                    key={field.name}
                    label={field.label}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleInputChange}
                    fullWidth
                    margin="dense"
                  />
                );
              case 'multicategoryselect':
                return (
                  <MultipleSelectCategoryChip
                    key={field.name}
                    label={field.label}
                    value={formData[field.name] || []}
                    set={handleCategoriesChange}
                    names={field.name === "projectSkills" ? ["Coding", "Other"]: ["Software", "Construction"]}
                    options={field.options}
                  />
                );
              case 'select':
                return (
                  <BasicSelect
                    key={field.name}
                    label={field.label}
                    value={formData[field.name] || []}
                    set={handleStatusChange}
                    names={["Complete", "Active"]}
                    options={field.options}
                  />
                );
                case 'date':
                    return (
                        <LocalizationProvider key={field.name} dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                            <DatePicker
                            name={field.name}
                            label={field.label}
                            defaultValue={formData[field.name] === "" ? null : dayjs(formData[field.name])}
                            onChange={(newValue) => handleDateChange(newValue, field.name)}
                            />
                            </DemoContainer>
                        </LocalizationProvider>
                       
                    );
              case 'textarea':
                return (
                  <TextField
                    key={field.name}
                    label={field.label}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                  />
                );
              case 'file':
                return (
                  <div key={field.name}>
                    <Button
                      variant="contained"
                      component="label"
                      startIcon={<CloudUploadIcon />}
                      fullWidth
                      sx={{ marginTop: 2 }}
                    >
                      Upload Profile Photo
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </Button>
                  </div>
                );
              default:
                return null;
            }
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for feedback */}
      {showSnackbar && <SnackbarAlert message={'Changes Saved'} toggleSuccess={toggleSnackbar}/>}
    </>
  );
};

export default DynamicFormDialog;
