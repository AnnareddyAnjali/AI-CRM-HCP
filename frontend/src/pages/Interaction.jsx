import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";

import api from "../api/api";

import InteractionSearchBar from "../components/InteractionSearchBar";
import InteractionForm from "../components/InteractionForm";
import InteractionTable from "../components/InteractionTable";

function Interaction() {
  const emptyForm = {
    hcp_id: "",
    date: "",
    interaction_type: "",
    summary: "",
    sentiment: "",
    follow_up: "",
  };

  const [interactions, setInteractions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState(emptyForm);

  const [notes, setNotes] = useState("");
  const [summary, setSummary] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchInteractions();
  }, []);

  const fetchInteractions = async () => {
    try {
      const response = await api.get("/interaction/");
      setInteractions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        await api.put(`/interaction/${editId}`, formData);
        alert("Interaction Updated Successfully");
      } else {
        await api.post("/interaction/", formData);
        alert("Interaction Added Successfully");
      }

      setFormData(emptyForm);
      setIsEditing(false);
      setEditId(null);

      fetchInteractions();
    } catch (error) {
      console.error(error);
      alert("Operation Failed");
    }
  };

  const editInteraction = (interaction) => {
    setFormData({
      hcp_id: interaction.hcp_id,
      date: interaction.date,
      interaction_type: interaction.interaction_type,
      summary: interaction.summary,
      sentiment: interaction.sentiment,
      follow_up: interaction.follow_up,
    });

    setEditId(interaction.id);
    setIsEditing(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const deleteInteraction = async (id) => {
    if (!window.confirm("Delete this Interaction?")) return;

    try {
      await api.delete(`/interaction/${id}`);
      alert("Interaction Deleted Successfully");
      fetchInteractions();
    } catch (error) {
      console.error(error);
      alert("Delete Failed");
    }
  };

  const filteredInteractions = interactions.filter((interaction) =>
    `${interaction.interaction_type} ${interaction.sentiment}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const generateSummary = async () => {
    if (!notes.trim()) {
      alert("Please enter doctor notes.");
      return;
    }

    try {
      const response = await api.post("/ai/summary", {
        text: notes,
      });

      setSummary(response.data.result);
    } catch (error) {
      console.error(error);
      alert("AI Summary generation failed.");
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Interactions
      </Typography>

      <InteractionSearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <InteractionForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isEditing={isEditing}
      />

      <InteractionTable
        interactions={filteredInteractions}
        editInteraction={editInteraction}
        deleteInteraction={deleteInteraction}
      />

      <Box
        sx={{
          mt: 5,
          p: 3,
          border: "1px solid #ddd",
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" gutterBottom>
          🤖 AI Interaction Summary
        </Typography>

        <TextField
          fullWidth
          multiline
          rows={5}
          label="Doctor Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={generateSummary}
        >
          Generate AI Summary
        </Button>

        <TextField
          fullWidth
          multiline
          rows={5}
          sx={{ mt: 3 }}
          label="AI Generated Summary"
          value={summary}
          InputProps={{
            readOnly: true,
          }}
        />
      </Box>
    </Container>
  );
}

export default Interaction;