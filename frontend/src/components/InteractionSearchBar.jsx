import { TextField } from "@mui/material";

function InteractionSearchBar({
  searchTerm,
  setSearchTerm,
}) {
  return (
    <TextField
      fullWidth
      label="Search by Interaction Type or Sentiment"
      variant="outlined"
      margin="normal"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}

export default InteractionSearchBar;