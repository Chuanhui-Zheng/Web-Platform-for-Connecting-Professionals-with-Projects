import React from 'react';
import { useNavigate } from "react-router-dom";
import Form from "../../components/Form"
import { useState } from "react";
import { TextField, Box, Typography } from "@mui/material";
import { apiPost } from "../../api";
import { useHeader } from '../../HeaderContext';
import ErrorPopup from '../../components/ErrorPopup';

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [errorMessage, setErrorMessage] = React.useState('');
  const [error, setError] = React.useState(false);

  const navigate = useNavigate();
  const [refresh, setRefresh] = React.useState(false);
  const { triggerHeaderUpdate } = useHeader();

  const toggleError = () => {
    setError(!error);
  }

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  // Login
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Handle API
    const email = formData.email
    const password = formData.password
    apiPost("/auth/login", { email, password })
      .then((data) => {
        console.log("API response:", data); // Log the API response
        if (!data.error) {
          localStorage.setItem("token", data.token);
          setRefresh((prev) => !prev);
          triggerHeaderUpdate();
          navigate("/dashboard");
        } else {
          setErrorMessage('Login failed');
          toggleError();
          throw new Error("Login failed.");
        }
      })
      .catch(() => {
        setErrorMessage('Username and password is incorrect or does not exist.');
        toggleError();
      });
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    ><br></br>
      <Box display="flex"
      justifyContent="center"
      alignItems="center" flexDirection="column" 
      sx={{border:'1px solid #fff', width:'auto',borderRadius:'35px', padding:'27px 10px',textAlign:'center',background:'rgba(255,255,255,0.3)', zIndex:'1' ,boxShadow: '0 4px 6px rgba(0,5,0,1)', backdropFilter:'blur(15px)'}}>
      <Typography variant='h4'color='white' fontWeight={500}>Login</Typography>
      <Form
        buttonName="Login"
        handleSubmit={handleSubmit}
      >
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
          label="Password"
          name="password"
          value={formData.password}
          onChange={onChange}
        />
      </Form>
      {error && <ErrorPopup message={errorMessage} toggleError={toggleError}/>}
      </Box>
    </ Box>
  );
}

export default Login;