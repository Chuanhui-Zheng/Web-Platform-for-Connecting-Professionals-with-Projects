import React from 'react';
import { useState } from "react";
import Form from "./Form"
import { Button, TextField } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import VisuallyHiddenInput from "../VisuallyHiddenInput";
import { apiPost } from "../../api";
import { useNavigate } from "react-router-dom";
import { useHeader } from "../../HeaderContext"; 
import { isValidEmail, isValidPassword, fileToDataUrl } from "../../helpers";
import RegistrationErrorMessage from "../RegistrationErrorMessage";
import ErrorPopup from '../ErrorPopup';

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
        formName="Company Register"
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
        />
        <TextField
          variant="filled"
          margin="normal"
          className="form-input"
          type="text"
          label="Company Password"
          name="companyPassword"
          value={formData.companyPassword}
          onChange={onChange}
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
        />
        <Button
          sx={{ margin: '16px 0' }}
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