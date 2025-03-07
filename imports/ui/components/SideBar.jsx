import React from 'react';
import { Meteor } from 'meteor/meteor';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Avatar,
  Typography,
  Divider,
  Button,
  CircularProgress,
} from '@mui/material';
import {
  Person as PersonIcon,
  Assignment as TaskIcon,
  Dashboard as DashboardIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';

const drawerWidth = 240;

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  const { user, isLoading } = useTracker(() => {
    const subscription = Meteor.subscribe('currentUserData');
    return {
      user: Meteor.user(),
      isLoading: !subscription.ready(),
    };
  }, []);

  const handleLogout = () => {
    Meteor.logout((err) => {
      if (!err) {
        navigate('/login');
      }
    });
  };

  if (isLoading) {
    return (
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            zIndex: 1000,
            height: '100%',
            position: 'fixed',
            bgcolor: '#5A72A0',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
        }}
      >
        <CircularProgress color="inherit" />
      </Drawer>
    );
  }

  const getNavLinks = () => {
    const links = {
      dashboard: {
        path: '/dashboard',
        icon: <DashboardIcon sx={{ color: 'white' }} />,
        text: 'Dashboard',
      },
      profile: {
        path: '/profile',
        icon: <PersonIcon sx={{ color: 'white' }} />,
        text: 'Profile',
      },
      tasks: {
        path: '/tasks',
        icon: <TaskIcon sx={{ color: 'white' }} />,
        text: 'Tasks',
      },
    };

    if (currentPath === '/dashboard' || currentPath === '/') {
      return [links.profile, links.tasks];
    } else if (currentPath === '/tasks') {
      return [links.profile, links.dashboard];
    } else if (currentPath === '/profile') {
      return [links.dashboard, links.tasks];
    } else if (currentPath === '/add-task') {
      return [links.profile, links.dashboard];
    }

    return [links.dashboard, links.profile, links.tasks];
  };

  const userEmail = user.emails[0].address || 'user@example.com';
  const userName = user.profile.nome || 'User Name';
  const userNamePartes = userName.split(' ');
  const userFirstName = userNamePartes[0].charAt(0).toUpperCase() + userNamePartes[0].slice(1);
  const userAvatar = user?.profile?.avatar || '/default-avatar.png';

  const navLinks = getNavLinks();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          zIndex: 1000,
          height: '100%',
          position: 'fixed',
          bgcolor: '#5A72A0',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          p: 2,
          pt: '84px',
          pb: 3,
        }}
      >
        <Avatar
          src={userAvatar}
          sx={{
            width: 40,
            height: 40,
            mb: 0,
            border: '2px solid white',
            marginTop: 'auto',
          }}
        />
        <Box
          sx={{
            display: 'flex',
            ml: 2,
            flexDirection: 'column',
          }}
        >
          <Typography variant="h6" sx={{ mt: 1, fontWeight: 'bold', fontSize: '1.1rem' }}>
            {userFirstName}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            {userEmail}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />

      <List sx={{ flexGrow: 1 }}>
        {navLinks.map((link) => (
          <ListItem
            button
            key={link.path}
            onClick={() => navigate(link.path)}
            sx={{
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.1)',
              },
              bgcolor: currentPath === link.path ? 'rgba(255,255,255,0.1)' : 'transparent',
            }}
          >
            <ListItemIcon>{link.icon}</ListItemIcon>
            <ListItemText primary={link.text} />
          </ListItem>
        ))}
      </List>

      <Box sx={{ p: 2, mt: 'auto', mb: '2vh' }}>
        <Button
          fullWidth
          variant="text"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{
            color: 'white',
            borderColor: 'white',
            justifyContent: 'flex-start',
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.1)',
              borderColor: 'red',
              color: 'red',
            },
          }}
        >
          Logout
        </Button>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
