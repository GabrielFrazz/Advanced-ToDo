import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { TextField, Button, Link as MuiLink } from "@mui/material";
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import InputAdornment from '@mui/material/InputAdornment';


export default LoginForm = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    Meteor.loginWithPassword(username, password, (err)=>{
      if(err){
        setError(err.reason);
      }else{
        navigate("/");
      }
    });
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2 className="login-title">Log in</h2>
        <form className="login-form" onSubmit={handleSubmit}>
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
              if (error) setError("");
            }}
            error = {Boolean(error)}
            helperText = {error}
          />

          <div className="extra-links">
            <MuiLink component={RouterLink} to="/register" underline="hover">
              Crie uma conta
            </MuiLink>
          </div>

          <Button 
            type="submit" 
            variant="contained" 
            fullWidth
            className="login-button"
          >
            Log in
          </Button>
        </form>
      </div>
    </div>
  );
};
