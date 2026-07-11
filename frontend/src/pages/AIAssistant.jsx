import { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";

import api from "../api/api";

function AIAssistant() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const askAI = async () => {
    if (!question.trim()) {
      alert("Enter a question.");
      return;
    }

    try {
      const response = await api.post("/ai/chat", {
        question,
      });

      setAnswer(response.data.answer);
    } catch (error) {
      console.error(error);
      alert("AI request failed.");
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        🤖 AI CRM Assistant
      </Typography>

      <TextField
        fullWidth
        label="Ask AI"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <Button
        variant="contained"
        sx={{ mt: 2 }}
        onClick={askAI}
      >
        Ask AI
      </Button>

      <Paper sx={{ mt: 3, p: 3 }}>
        <Typography whiteSpace="pre-wrap">
          {answer}
        </Typography>
      </Paper>
    </Container>
  );
}

export default AIAssistant;