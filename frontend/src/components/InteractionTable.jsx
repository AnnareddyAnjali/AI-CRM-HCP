import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function InteractionTable({
  interactions,
  editInteraction,
  deleteInteraction,
}) {
  return (
    <TableContainer component={Paper}>
      <Table>

        <TableHead>
          <TableRow sx={{ backgroundColor: "#1976d2" }}>
            <TableCell sx={{ color: "white" }}>ID</TableCell>
            <TableCell sx={{ color: "white" }}>HCP ID</TableCell>
            <TableCell sx={{ color: "white" }}>Date</TableCell>
            <TableCell sx={{ color: "white" }}>Type</TableCell>
            <TableCell sx={{ color: "white" }}>Summary</TableCell>
            <TableCell sx={{ color: "white" }}>Sentiment</TableCell>
            <TableCell sx={{ color: "white" }}>Follow Up</TableCell>
            <TableCell sx={{ color: "white" }} align="center">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {interactions.map((interaction) => (
            <TableRow key={interaction.id}>
              <TableCell>{interaction.id}</TableCell>
              <TableCell>{interaction.hcp_id}</TableCell>
              <TableCell>{interaction.date}</TableCell>
              <TableCell>{interaction.interaction_type}</TableCell>
              <TableCell>{interaction.summary}</TableCell>
              <TableCell>{interaction.sentiment}</TableCell>
              <TableCell>{interaction.follow_up}</TableCell>

              <TableCell align="center">
                <IconButton
                  color="primary"
                  onClick={() => editInteraction(interaction)}
                >
                  <EditIcon />
                </IconButton>

                <IconButton
                  color="error"
                  onClick={() => deleteInteraction(interaction.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>

      </Table>
    </TableContainer>
  );
}

export default InteractionTable;