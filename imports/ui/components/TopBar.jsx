import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

const TopBar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: 1200,
        width: '100%',
        height: '77px',
        bgcolor: '#4A5C7E',
      }}
    >
      <Toolbar>
        <Box className="logo-image-topbar"> </Box>
        <Typography variant="h1" className="title-text-topbar">
          Advanced <br /> To-Do
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
