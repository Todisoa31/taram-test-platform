"use client";

import { Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar } from "@mui/material";
import Link from "next/link";

const drawerWidth = 240;

export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} href="/dashboard">
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} href="/articles">
            <ListItemText primary="Articles" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
