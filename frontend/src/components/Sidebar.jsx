import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <Drawer variant="permanent">
      <List sx={{ width: 240 }}>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/">
            <ListItemText primary="📊 Dashboard" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/hcp">
            <ListItemText primary="👨‍⚕️ Healthcare Professionals" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/interaction">
            <ListItemText primary="📝 Interactions" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/ai">
            <ListItemText primary="🤖 AI Assistant" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;