import React from "react";
import { useState } from "react";
import Form from "../../components/Form"
import { Button, TextField } from "@mui/material";
import VisuallyHiddenInput from "../../components/VisuallyHiddenInput";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { apiPost } from "../../api";
import { useNavigate } from "react-router-dom";
import { useHeader } from "../../context/HeaderContext"; 
import RegistrationErrorMessage from "../../components/RegistrationErrorMessage";
import { isValidEmail, isValidPassword, fileToDataUrl } from "../../helpers";
import ErrorPopup from "../../components/ErrorPopup";
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

/**
 * Professional Registeration Form
 * @returns 
 */
function ProfessionalRegisterForm() {
  const [formData, setFormData] = useState({
    professionalFullName: "",
    professionalEmail: "",
    professionalPassword: "",
    professionalPhoto: ""
  });
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [error, setError] = React.useState(false);
  const navigate = useNavigate();
  const { triggerHeaderUpdate } = useHeader();
  const [showPassword, setShowPassword] = React.useState(true);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  // Save form data on changes
  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const toggleError = () => {
    setError(!error);
  }

  // Update file
  const handleFileChange = (event) => {
    // Get the first uploaded file
    const file = event.target.files[0]; 

    fileToDataUrl(file).then((dataUrl) => {
      setFormData({
        ...formData,
        professionalPhoto: dataUrl
      });
    }).catch((error) => {
      alert("Error converting file to data URL:", error);
    });
  };

  // Submit registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      professionalEmail,
      professionalPassword,
      professionalPhoto,
      professionalFullName
    } = formData
    // Set that it is valid (by default)
    setIsValid(true)

    // Check if valid email
    if (!isValidEmail(professionalEmail) || !isValidPassword(professionalPassword)) {
      setIsValid(false);
      return;
    }

    // Register the professional
    apiPost("/auth/register/professional", { 
      professionalFullName, 
      professionalEmail, 
      professionalPassword, 
      professionalPhoto 
    })
      .then((data) => {
        if (!data.error) {
          localStorage.setItem("token", data.token);
          navigate("/dashboard");
          triggerHeaderUpdate();
        } else {
          throw new Error("Register failed.")
        }
      })
      .catch(() => {
        setErrorMessage('Registration details are not valid');
        toggleError();
      });
  }

  return (
    <>
    <Form
        buttonName="Register"
        handleSubmit={handleSubmit}
    >
        {isValid ? 
          <></>
          :
          <RegistrationErrorMessage />
        }
        <TextField
          variant="filled"
          margin="normal"
          className="form-input"
          type="text"
          label="Full name"
          name="professionalFullName"
          value={formData.professionalFullName}
          onChange={onChange}
          sx={{ backgroundColor:"white" }}
        />
        <TextField
          variant="filled"
          margin="normal"
          className="form-input"
          type="text"
          label="Email"
          name="professionalEmail"
          value={formData.professionalEmail}
          onChange={onChange}
          sx={{  backgroundColor:"white" }}
        />
        <TextField
          variant="filled"
          margin="normal"
          className="form-input"
          type={showPassword ? 'text' : 'password'}
          label="Password"
          name="professionalPassword"
          value={formData.professionalPassword}
          onChange={onChange}
          sx={{ backgroundColor:"white" }}
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">
              <IconButton
                aria-label={
                  showPassword ? 'hide the password' : 'display the password'
                }
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff /> }
              </IconButton>
            </InputAdornment>,
            },
          }}
        />
        <Button
          sx={{ margin: '16px 0', borderRadius:"20px", backgroundColor:"#364749" }}
          className="form-input"
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
        >
          Upload Profile Photo
          <VisuallyHiddenInput
            type="file"
            accept="image/*"
            name="professionalPhoto"
            value=""
            onChange={handleFileChange}
          />
        </Button>
      </Form>
      {error && <ErrorPopup message={errorMessage} toggleError={toggleError}/>}
    </>
  )
}

export default ProfessionalRegisterForm