import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import api from "../api/api";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import PeopleIcon from "@mui/icons-material/People";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import PsychologyIcon from "@mui/icons-material/Psychology";
import EventIcon from "@mui/icons-material/Event";

function Dashboard() {
  const [hcpCount, setHcpCount] = useState(0);
  const [interactionCount, setInteractionCount] = useState(0);
  const [positiveCount, setPositiveCount] = useState(0);
  const [followupCount, setFollowupCount] = useState(0);

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      const hcpResponse = await api.get("/hcp/");
      const interactionResponse = await api.get("/interaction/");

      const interactions = interactionResponse.data;

      setHcpCount(hcpResponse.data.length);
      setInteractionCount(interactions.length);

      const positive = interactions.filter(
        (i) =>
          i.sentiment &&
          i.sentiment.toLowerCase() === "positive"
      ).length;

      setPositiveCount(positive);

      const today = new Date();

      const followups = interactions.filter((i) => {
        if (!i.follow_up) return false;
        return new Date(i.follow_up) >= today;
      }).length;

      setFollowupCount(followups);
    } catch (error) {
      console.error(error);
    }
  };

  const barData = [
    { name: "HCPs", value: hcpCount },
    { name: "Interactions", value: interactionCount },
  ];

  const pieData = [
    { name: "Positive", value: positiveCount },
    { name: "Follow-ups", value: followupCount },
  ];

  const COLORS = ["#4CAF50", "#2196F3"];

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
            <Grid item xs={12} md={3}>
              <Card>
                <CardContent sx={{ textAlign: "center" }}>
                  <PeopleIcon color="primary" fontSize="large" />
                  <Typography variant="h6">
                    Healthcare Professionals
                  </Typography>
                  <Typography variant="h3">
                    {hcpCount}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={3}>
              <Card>
                <CardContent sx={{ textAlign: "center" }}>
                  <LocalHospitalIcon color="success" fontSize="large" />
                  <Typography variant="h6">
                    Interactions
                  </Typography>
                  <Typography variant="h3">
                    {interactionCount}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={3}>
              <Card>
                <CardContent sx={{ textAlign: "center" }}>
                  <PsychologyIcon color="warning" fontSize="large" />
                  <Typography variant="h6">
                    Positive
                  </Typography>
                  <Typography variant="h3">
                    {positiveCount}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={3}>
              <Card>
                <CardContent sx={{ textAlign: "center" }}>
                  <EventIcon color="error" fontSize="large" />
                  <Typography variant="h6">
                    Follow-ups
                  </Typography>
                  <Typography variant="h3">
                    {followupCount}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Overall Statistics
                  </Typography>

                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={barData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#1976d2" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Sentiment Overview
                  </Typography>

                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        dataKey="value"
                        outerRadius={100}
                        label
                      >
                        {pieData.map((entry, index) => (
                          <Cell
                            key={index}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
         <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
            <Button
             variant="contained"
             color="success"
             href="http://127.0.0.1:8000/report/hcp"
             >
                📄 HCP Report
            </Button>
            
            <Button
            variant="contained"
            color="primary"
            href="http://127.0.0.1:8000/report/interaction"
            >
                📄 Interaction Report
            </Button>
        </Box>
        </Box>
      </Box>
    </>
  );
}

export default Dashboard;