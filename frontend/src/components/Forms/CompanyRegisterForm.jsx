import { useState } from "react";
import Form from "./Form"
import { Button, TextField } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import VisuallyHiddenInput from "../VisuallyHiddenInput";
import { apiPost } from "../../api";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  // Submit registration
  const handleSubmit = async (e) => {
    e.preventDefault();

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
          navigate("/companydashboard");
        } else {
          throw new Error("Register failed.")
        }
      })
      .catch(() => {
        alert("Registration details are not valid.")
      });
  }

  return (
    <Form 
      formName="Company Register"
      buttonName="Register"
      handleSubmit={handleSubmit}
    >
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
            value={formData.companyLogo}
            onChange={onChange}
        />
      </Button>
    </Form>
  )
}

export default CompanyRegisterForm