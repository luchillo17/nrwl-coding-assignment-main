import ListIcon from '@mui/icons-material/List';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Toolbar,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';

const links = [
  { to: '/', title: 'Tickets', icon: <ListIcon /> },
  { to: '/users', title: 'Users', icon: <PersonIcon /> },
];

export const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawerOpen = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Ticketing App
          </Typography>
        </Toolbar>
      </AppBar>

      <SwipeableDrawer
        open={drawerOpen}
        onOpen={toggleDrawerOpen}
        onClose={toggleDrawerOpen}
      >
        <List>
          {links.map((link) => (
            <ListItem key={link.to} disablePadding>
              <ListItemButton component={RouterLink} to={link.to}>
                <ListItemIcon>{link.icon}</ListItemIcon>

                <ListItemText primary={link.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </SwipeableDrawer>
    </>
  );
};
