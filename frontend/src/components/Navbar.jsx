import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@mui/material";

function Navbar() {
  const username = localStorage.getItem("username");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");

    window.location.href = "/login";
  };

  return (
    <AppBar position="static">
      <Toolbar>

        <Typography
          variant="h6"
          sx={{ flexGrow: 1 }}
        >
          AI CRM - Healthcare Professionals
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>

          <Typography variant="body1">
            Welcome, {username}
          </Typography>

          <Button
            color="inherit"
            variant="outlined"
            onClick={logout}
            sx={{
              borderColor: "white",
              color: "white",
            }}
          >
            Logout
          </Button>

        </Box>

      </Toolbar>
    </AppBar>
  );
}

export default Navbar;