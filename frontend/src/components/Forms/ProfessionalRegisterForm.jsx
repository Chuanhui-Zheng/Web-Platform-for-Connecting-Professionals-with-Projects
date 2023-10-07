import { useState } from "react";
import Form from "./Form"
import { Button, TextField } from "@mui/material";
import VisuallyHiddenInput from "../VisuallyHiddenInput";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


function ProfessionalRegisterForm() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        website: "",
        biography: "",
        education: "",
        qualifications: "",
        skills: "",
        photo: ""
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    //// turn into async
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Handle API here /////////////
            console.log(formData)

        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Form
            route="/api/user/professionalRegister/" 
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
                name="fullName"
                value={formData.fullName}
                onChange={onChange}
            />
            <TextField
                variant="filled"
                margin="normal"
                className="form-input"
                type="text"
                label="Email"
                name="email"
                value={formData.email}
                onChange={onChange}
            />
            <TextField
                variant="filled"
                margin="normal"
                className="form-input"
                type="text"
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={onChange}
            />
            <TextField
                variant="filled"
                margin="normal"
                className="form-input"
                type="text"
                label="Biography"
                name="biography"
                value={formData.biography}
                onChange={onChange}
            />
            <TextField
                variant="filled"
                margin="normal"
                className="form-input"
                type="text"
                label="Education"
                name="education"
                value={formData.education}
                onChange={onChange}
            />
            <TextField
                variant="filled"
                margin="normal"
                className="form-input"
                type="text"
                label="Qualifications"
                name="qualifications"
                value={formData.qualifications}
                onChange={onChange}
            />
            {/*  */}
            <TextField
                variant="filled"
                margin="normal"
                className="form-input"
                type="text"
                label="Skills"
                name="skills"
                value={formData.skills}
                onChange={onChange}
            />
            <Button
                sx={{ margin: '16px 0' }}
                className="form-input"
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
            >
                Upload files
                <VisuallyHiddenInput
                    type="file"
                    accept="image/*"
                    name="photo"
                    value={formData.photo}
                    onChange={onChange}
                />
            </Button>
        </Form>
    )
}

export default ProfessionalRegisterForm