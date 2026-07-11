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

function HCPTable({
  hcps,
  editHCP,
  deleteHCP,
}) {
  return (
    <TableContainer component={Paper}>
      <Table>

        <TableHead>
          <TableRow sx={{ backgroundColor: "#1976d2" }}>
            <TableCell sx={{ color: "white" }}>ID</TableCell>
            <TableCell sx={{ color: "white" }}>Name</TableCell>
            <TableCell sx={{ color: "white" }}>Hospital</TableCell>
            <TableCell sx={{ color: "white" }}>Speciality</TableCell>
            <TableCell sx={{ color: "white" }}>City</TableCell>
            <TableCell sx={{ color: "white" }}>Email</TableCell>
            <TableCell sx={{ color: "white" }}>Phone</TableCell>
            <TableCell sx={{ color: "white" }} align="center">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {hcps.map((hcp) => (
            <TableRow key={hcp.id}>

              <TableCell>{hcp.id}</TableCell>
              <TableCell>{hcp.name}</TableCell>
              <TableCell>{hcp.hospital}</TableCell>
              <TableCell>{hcp.speciality}</TableCell>
              <TableCell>{hcp.city}</TableCell>
              <TableCell>{hcp.email}</TableCell>
              <TableCell>{hcp.phone}</TableCell>

              <TableCell align="center">

                <IconButton
                  color="primary"
                  onClick={() => editHCP(hcp)}
                >
                  <EditIcon />
                </IconButton>

                <IconButton
                  color="error"
                  onClick={() => deleteHCP(hcp.id)}
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

export default HCPTable;