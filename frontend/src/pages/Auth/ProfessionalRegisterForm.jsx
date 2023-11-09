import { useState } from "react";
import Form from "../../components/Forms/Form"
import { Button, TextField } from "@mui/material";
import VisuallyHiddenInput from "../../components/VisuallyHiddenInput";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { apiPost } from "../../api";
import { useNavigate } from "react-router-dom";
import { useHeader } from "../../HeaderContext"; 
import RegistrationErrorMessage from "../../components/RegistrationErrorMessage";
import { isValidEmail, isValidPassword, fileToDataUrl } from "../../helpers";


function ProfessionalRegisterForm() {
  const [formData, setFormData] = useState({
    professionalFullName: "",
    professionalEmail: "",
    professionalPassword: "",
    professionalPhoto: ""
  });
  const [isValid, setIsValid] = useState(true);

  const navigate = useNavigate();
  const { triggerHeaderUpdate } = useHeader();

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  // Update file
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the first uploaded file

    fileToDataUrl(file).then((dataUrl) => {
      setFormData({
        ...formData,
        professionalPhoto: dataUrl
      });
      console.log("File as data URL:", dataUrl);
    }).catch((error) => {
      console.error("Error converting file to data URL:", error);
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

    console.log(`professionalEmail = ${professionalEmail}`)
    console.log(`professionalPassword = ${professionalPassword}`)
    console.log(`isValidEmail(professionalEmail) = ${isValidEmail(professionalEmail)}`)
    console.log(`isValidPassword(professionalPassword) = ${isValidPassword(professionalPassword)}`)
    

    // Set that it is valid (by default)
    setIsValid(true)

    // Check if valid email
    if (!isValidEmail(professionalEmail) || !isValidPassword(professionalPassword)) {
      setIsValid(false);
      return;
    }

    apiPost("/auth/register/professional", { professionalFullName, professionalEmail, professionalPassword, professionalPhoto })
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
        alert("Registration details are not valid.")
      });
  }

  return (
    <Form
      formName="Professional Register"
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
          value=""
          onChange={handleFileChange}
        />
      </Button>
    </Form>
  )
}

export default ProfessionalRegisterForm