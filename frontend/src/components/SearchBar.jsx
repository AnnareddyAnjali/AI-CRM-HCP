import { TextField } from "@mui/material";

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <TextField
      fullWidth
      label="Search by Name, Hospital or City"
      variant="outlined"
      margin="normal"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}

export default SearchBar;