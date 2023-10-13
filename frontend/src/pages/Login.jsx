import { useNavigate } from "react-router-dom";
import Form from "../components/Forms/Form"
import { useState } from "react";
import { TextField } from "@mui/material";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";


function Login() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

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
    setLoading(true);

    try {
      // Handle API
      console.log(formData)
      const username = formData.email
      const password = formData.password
      const res = await api.post("/api/token/", { username, password });
      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
      navigate("/prodashbaord") // ???????
    } catch (error) {
      alert(error)
    } finally {
      setLoading(false)
    }
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