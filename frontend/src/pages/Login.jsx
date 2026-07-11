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

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const response = await api.post("/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("role", response.data.role);

      alert("Login Successful");

      navigate("/");
    } catch (error) {
      alert(error.response?.data?.detail || "Login Failed");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper sx={{ p: 4 }} elevation={5}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
        >
          AI CRM Login
        </Typography>

        <TextField
          fullWidth
          label="Username"
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3 }}
          onClick={login}
        >
          Login
        </Button>

        <Typography
          align="center"
          sx={{ mt: 2 }}
        >
          Don't have an account?{" "}
          <Link to="/register">
            Create Account
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}

export default Login;