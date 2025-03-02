import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { TextField, Button, Link as MuiLink, Box, Typography } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import InputAdornment from '@mui/material/InputAdornment';

export default LoginForm = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    Meteor.loginWithPassword(username, password, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        navigate('/dashboard');
      }
    });
  };

  return (
    <Box className="login-wrapper">
      <Box className="login-container">
        <Typography variant="h5" className="login-title">
          Log in
        </Typography>
        <Box component="form" className="login-form" onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            placeholder="Digite seu email"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              },
            }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
            label="Senha"
            variant="outlined"
            fullWidth
            margin="normal"
            placeholder="Digite sua senha"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <KeyIcon />
                  </InputAdornment>
                ),
              },
            }}
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError('');
            }}
            error={Boolean(error)}
            helperText={error}
          />

          <Box className="extra-links">
            <MuiLink component={RouterLink} to="/register" underline="hover">
              Crie uma conta
            </MuiLink>
          </Box>

          <Button type="submit" variant="contained" fullWidth className="login-button">
            Log in
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
