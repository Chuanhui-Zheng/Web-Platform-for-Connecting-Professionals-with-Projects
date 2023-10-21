import { useState } from "react";
import Form from "./Form"
import { Button, TextField } from "@mui/material";
import VisuallyHiddenInput from "../VisuallyHiddenInput";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { apiPost } from "../../api";
import { useNavigate } from "react-router-dom";


function ProfessionalRegisterForm() {
  const [formData, setFormData] = useState({
    professionalFullName: "",
    professionalEmail: "",
    professionalPassword: "",
    // professionalWebsite: "",
    // professionalPhoneNumber: "",
    // professionalDescription: "",
    // professionalQualifications: "",
    // professionalEducation: "",
    // professionalSkills: "",
    // professionalPhoto: ""
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

    const professionalEmail = formData.professionalEmail
    const professionalPassword = formData.professionalPassword
    apiPost("/auth/register/professional", { professionalEmail, professionalPassword })
      .then((data) => {
        if (!data.error) {
          localStorage.setItem("token", data.token);
          navigate("/prodashbaord"); // ???????
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
      formName="Professional Register"
      buttonName="Register"
      handleSubmit={handleSubmit}
    >
      <TextField
        variant="filled"
        margin="normal"
        className="form-input"
        type="text"
        label="Full name"
        name="professionalFullName"
        value={formData.professionalFullName}
        onChange={onChange}
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
      />
      <TextField
        variant="filled"
        margin="normal"
        className="form-input"
        type="text"
        label="Password"
        name="professionalPassword"
        value={formData.professionalPassword}
        onChange={onChange}
      />
      {/* <TextField
        variant="filled"
        margin="normal"
        className="form-input"
        type="text"
        label="Website"
        name="professionalWebsite"
        value={formData.professionalWebsite}
        onChange={onChange}
      />
      <TextField
        variant="filled"
        margin="normal"
        className="form-input"
        type="text"
        label="Phone Number"
        name="professionalPhoneNumber"
        value={formData.professionalPhoneNumber}
        onChange={onChange}
      />
      <TextField
        variant="filled"
        margin="normal"
        className="form-input"
        type="text"
        label="Description"
        name="professionalDescription"
        value={formData.professionalDescription}
        onChange={onChange}
      />
      <TextField
        variant="filled"
        margin="normal"
        className="form-input"
        type="text"
        label="Qualifications"
        name="professionalQualifications"
        value={formData.professionalQualifications}
        onChange={onChange}
      />
      <TextField
        variant="filled"
        margin="normal"
        className="form-input"
        type="text"
        label="Education"
        name="professionalEducation"
        value={formData.professionalEducation}
        onChange={onChange}
      />
      <TextField
        variant="filled"
        margin="normal"
        className="form-input"
        type="text"
        label="Skills"
        name="professionalSkills"
        value={formData.professionalSkills}
        onChange={onChange}
      /> */}
      <Button
        sx={{ margin: '16px 0' }}
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
          value={formData.professionalPhoto}
          onChange={onChange}
        />
      </Button>
    </Form>
  )
}

export default ProfessionalRegisterForm