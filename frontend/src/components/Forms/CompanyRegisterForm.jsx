import { useState } from "react";
import Form from "./Form"
import { Button, TextField } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import VisuallyHiddenInput from "../VisuallyHiddenInput";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";
import apiPost from "../../api";
import { useNavigate } from "react-router-dom";

function CompanyRegisterForm() {
  const [loading, setLoading] = useState(false);
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
    setLoading(true);

    try {
      // Handle API
      console.log(formData)
      const companyEmail = formData.companyEmail
      const companyPassword = formData.companyPassword
      // const res = await api.post("/api/user/register/", { username, password });
      const res = apiPost("/auth/register/company", { companyEmail, companyPassword })
      localStorage.setItem("toekn", res.data.access);
      // localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
      navigate("/companydashboard")
    } catch (error) {
      alert(error)
    } finally {
      setLoading(false)
    }
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