import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { menu } from "./sidebarMenu";
import { Link } from "react-router-dom";
import { Home, Logout } from "@mui/icons-material";

export const drawer = (
  <div>
    <Toolbar />
    <Divider />
    <List>
      {menu.map((item, index) => (
        <Link key={index} to={`/${item.path}`}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        </Link>
      ))}
    </List>
    <Divider />
    <List>
      <Link to="/">
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
      </Link>
      <Button
        fullWidth
        color="error"
        sx={{ padding: "0", textTransform: "capitalize" }}
      >
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon sx={{ color: "inherit" }}>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </Button>
    </List>
  </div>
);
