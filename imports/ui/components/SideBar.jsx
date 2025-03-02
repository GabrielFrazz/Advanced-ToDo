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
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';

const drawerWidth = 240;

const Sidebar = () => {
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

  const userEmail = user.emails[0].address || 'user@example.com';
  const userName = user.profile.nome || 'User Name';
  const userNamePartes = userName.split(' ');
  const userFirstName = userNamePartes[0].charAt(0).toUpperCase() + userNamePartes[0].slice(1);
  const userAvatar = user?.profile?.avatar || '/default-avatar.png';

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
        <ListItem
          button
          onClick={() => navigate('/profile')}
          sx={{
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.1)',
            },
          }}
        >
          <ListItemIcon>
            <PersonIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>

        <ListItem
          button
          onClick={() => navigate('/tasks')}
          sx={{
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.1)',
            },
          }}
        >
          <ListItemIcon>
            <TaskIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Tasks" />
        </ListItem>
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
