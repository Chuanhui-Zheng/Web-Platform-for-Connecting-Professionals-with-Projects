import React from 'react';
import { useNavigate } from "react-router-dom";
import Form from "../../components/Forms/Form"
import { useState } from "react";
import { TextField } from "@mui/material";
import { apiPost } from "../../api";
import decodeJWT from "../../decodeJWT";
import { useHeader } from '../../HeaderContext';

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  const [refresh, setRefresh] = React.useState(false);
  const { triggerHeaderUpdate } = useHeader();

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
          throw new Error("Login failed.");
        }
      })
      .catch(() => {
        alert("Username and password is incorrect or does not exist.");
      });
  }

  return (
    <Form
      formName="Login"
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
  );
}

export default Login;