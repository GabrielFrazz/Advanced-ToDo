import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Box, Typography } from '@mui/material';

const Home = () => {
  return (
    <Box className="wallpaper-page">
      <Box className="home-wrapper">
        <Box className="home-screen">
          <Box className="home-title">
            <Box className="logo-image"> </Box>

            <Typography variant="h1" className="home-title-text">
              Advanced <br /> To-Do
            </Typography>
          </Box>

          <Typography variant="h2" className="home-text">
            Gerencie suas tarefas <br /> de forma prática
          </Typography>

          <Box className="home-login-button">
            <Link to="/login">
              <Button type="submit" variant="contained" fullWidth className="login-button">
                Log in
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
