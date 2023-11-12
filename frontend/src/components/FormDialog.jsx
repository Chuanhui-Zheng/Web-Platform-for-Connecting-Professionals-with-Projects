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
import { apiPut } from '../api';
import { fileToDataUrl } from '../helpers';
import { useHeader } from '../HeaderContext';
import { useProfile } from '../ProfileContext';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import MultipleSelectChip from './MultiSelect'; // Assumes you have a custom multi-select component
import SnackbarAlert from './SnackbarAlert';

const DynamicFormDialog = ({ open, onClose, formConfig, title, userId, userType }) => {
  const [formData, setFormData] = useState({});
  const [showSnackbar, setShowSnackbar] = useState(false);
  const navigate = useNavigate();
  const { triggerHeaderUpdate } = useHeader();
  const { triggerProfileUpdate } = useProfile();

  useEffect(() => {
    if (userType === "professional") {
        setFormData({
            professionalFullName: "",
            professionalPassword: "",
            professionalPhoneNumber: "",
            professionalDescription: "",
            professionalEducation: "",
            professionalWebsite: "",
            professionalQualifications: "",
            professionalSkills: [],
            professionalPhoto: "",
        })
    } else if (userType === "company") {
        setFormData({
            companyName: "",
            companyPassword: "",
            companyPhoneNumber: "",
            companyWebsite: "",
            companyDescription: "",
            companyLogo: "",
        })
    }
  }, []);    


  // Handle input changes for text, select, and multi-select fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
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
          {formConfig.map((field) => {
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
                    variant="filled"
                  />
                );
              case 'select':
                return (
                  <FormControl fullWidth margin="dense" key={field.name}>
                    <InputLabel>{field.label}</InputLabel>
                    <Select
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={handleInputChange}
                    >
                      {field.options.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                );
              case 'multiselect':
                return (
                  <MultipleSelectChip
                    key={field.name}
                    value={formData[field.name] || []}
                    set={handleSkillsChange}
                    options={field.options}
                  />
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
                    variant="filled"
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
      {showSnackbar && <SnackbarAlert message={'Successfully edited profile'} toggleSuccess={toggleSnackbar}/>}
    </>
  );
};

export default DynamicFormDialog;
