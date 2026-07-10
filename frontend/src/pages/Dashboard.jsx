import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

function Dashboard() {
  return (
    <>
      <Navbar />

      <Box sx={{ display: "flex" }}>
        <Sidebar />

        <Box sx={{ flexGrow: 1, p: 4, ml: "240px" }}>
          <Typography variant="h4" gutterBottom>
            Dashboard
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    Healthcare Professionals
                  </Typography>

                  <Typography variant="h3">
                    5
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    Interactions
                  </Typography>

                  <Typography variant="h3">
                    0
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    AI Summaries
                  </Typography>

                  <Typography variant="h3">
                    0
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default Dashboard;