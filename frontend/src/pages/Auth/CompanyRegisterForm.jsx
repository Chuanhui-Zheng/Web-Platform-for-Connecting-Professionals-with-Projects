import React from 'react';
import { useState } from "react";
import Form from "../../components/Form"
import { Button, TextField } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import VisuallyHiddenInput from "../../components/VisuallyHiddenInput";
import { apiPost } from "../../api";
import { useNavigate } from "react-router-dom";
import { useHeader } from "../../HeaderContext"; 
import { isValidEmail, isValidPassword, fileToDataUrl } from "../../helpers";
import RegistrationErrorMessage from "../../components/RegistrationErrorMessage";
import ErrorPopup from '../../components/ErrorPopup';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';

function CompanyRegisterForm() {
  const [formData, setFormData] = useState({
    companyName: "",
    companyEmail: "",
    companyPassword: "",
    companyPhoneNumber: "",
    companyWebsite: "",
    companyLogo: "",
    companyDescription: ""
  });
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [error, setError] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(true);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  const navigate = useNavigate();
  const { triggerHeaderUpdate } = useHeader();

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
    const file = event.target.files[0]; // Get the first uploaded file

    fileToDataUrl(file).then((dataUrl) => {
      setFormData({
        ...formData,
        companyLogo: dataUrl
      });
      console.log("File as data URL:", dataUrl);
    }).catch((error) => {
      console.error("Error converting file to data URL:", error);
    });
  };


  // Submit registration
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Set that it is valid (by default)
    setIsValid(true)

    // Check if valid email
    if (!isValidEmail(formData.companyEmail) || !isValidPassword(formData.companyPassword)) {
      setIsValid(false);
      return;
    }

    const {
      companyName,
      companyEmail,
      companyPassword,
      companyPhoneNumber,
      companyWebsite,
      companyLogo,
      companyDescription
    } = formData

    // const companyEmail = formData.companyEmail
    apiPost("/auth/register/company", { 
      companyName,
      companyEmail,
      companyPassword,
      companyPhoneNumber,
      companyWebsite,
      companyLogo,
      companyDescription
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
          label="Company Name"
          name="companyName"
          value={formData.companyName}
          onChange={onChange}
          sx={{ backgroundColor:"white" }}
        />
        <TextField
          variant="filled"
          margin="normal"
          className="form-input"
          type="text"
          label="Company Email"
          name="companyEmail"
          value={formData.companyEmail}
          onChange={onChange}
          sx={{backgroundColor:"white" }}
        />
        <TextField
          variant="filled"
          margin="normal"
          className="form-input"
          type={showPassword ? 'text' : 'password'}
          label="Company Password"
          name="companyPassword"
          value={formData.companyPassword}
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
                {showPassword ?  <Visibility /> : <VisibilityOff /> }
              </IconButton>
            </InputAdornment>,
            },
          }}
        />
        <TextField
          variant="filled"
          margin="normal"
          className="form-input"
          type="text"
          label="Company Phone Number"
          name="companyPhoneNumber"
          value={formData.companyPhoneNumber}
          onChange={onChange}
          sx={{ backgroundColor:"white" }}
        />
        <TextField
          variant="filled"
          margin="normal"
          className="form-input"
          type="text"
          label="Company Website"
          name="companyWebsite"
          value={formData.companyWebsite}
          onChange={onChange}
          sx={{ backgroundColor:"white" }}
        />
        <TextField
          variant="filled"
          margin="normal"
          className="form-input"
          type="text"
          label="Company Description"
          name="companyDescription"
          value={formData.companyDescription}
          onChange={onChange}
          sx={{ backgroundColor:"white" }}
        />
        <Button
          sx={{ margin: '16px 0', backgroundColor:"#364749", borderRadius:'20px' }}
          className="form-input"
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
        >
          Upload Company Logo
          <VisuallyHiddenInput
              type="file"
              accept="image/*"
              name="companyLogo"
              value=""
              onChange={handleFileChange}
          />
        </Button>
      </Form>
      {error && <ErrorPopup message={errorMessage} toggleError={toggleError}/>}
    </>
  )
}

export default CompanyRegisterForm