import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";

import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const register = async () => {
    try {
      await api.post("/users/register", formData);

      alert("Registration Successful");

      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.detail || "Registration Failed");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4 }} elevation={5}>

        <Typography
          variant="h4"
          align="center"
          gutterBottom
        >
          Create Account
        </Typography>

        <TextField
          fullWidth
          margin="normal"
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          type="password"
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3 }}
          onClick={register}
        >
          Register
        </Button>

        <Typography
          align="center"
          sx={{ mt: 2 }}
        >
          Already have an account?

          <Link
            to="/login"
            style={{ marginLeft: 5 }}
          >
            Login
          </Link>

        </Typography>

      </Paper>
    </Container>
  );
}

export default Register;