import {
  Grid,
  TextField,
  Button,
  Paper,
} from "@mui/material";

function InteractionForm({
  formData,
  handleChange,
  handleSubmit,
  isEditing,
}) {
  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="HCP ID"
              name="hcp_id"
              type="number"
              value={formData.hcp_id}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Interaction Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Interaction Type"
              name="interaction_type"
              value={formData.interaction_type}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Sentiment"
              name="sentiment"
              value={formData.sentiment}
              onChange={handleChange}
              placeholder="Positive / Neutral / Negative"
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Summary"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Follow-up Date"
              name="follow_up"
              type="date"
              value={formData.follow_up}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              size="large"
            >
              {isEditing
                ? "Update Interaction"
                : "Add Interaction"}
            </Button>
          </Grid>

        </Grid>
      </form>
    </Paper>
  );
}

export default InteractionForm;