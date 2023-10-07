import { useState } from "react";
import Form from "./Form"
import { Button, styled, TextField } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import VisuallyHiddenInput from "../VisuallyHiddenInput";


function CompanyRegisterForm() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        website: "",
        logo: "",
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
            route="/api/user/companyRegister/" 
            formName="Company Register"
            buttonName="Register"
            handleSubmit={handleSubmit}
        >
            <TextField
                variant="filled"
                margin="normal"
                className="form-input"
                label="Company Name"
                name="name"
                value={formData.name}
                onChange={onChange}
            />
            <TextField
                variant="filled"
                margin="normal"
                className="form-input"
                type="text"
                label="Company Email"
                name="email"
                value={formData.email}
                onChange={onChange}
            />
            <TextField
                variant="filled"
                margin="normal"
                className="form-input"
                type="text"
                label="Company Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={onChange}
            />
            <TextField
                variant="filled"
                margin="normal"
                className="form-input"
                type="text"
                label="Company Website"
                name="website"
                value={formData.website}
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
                    name="logo"
                    value={formData.logo}
                    onChange={onChange}
                />
            </Button>
        </Form>
    )
}

export default CompanyRegisterForm