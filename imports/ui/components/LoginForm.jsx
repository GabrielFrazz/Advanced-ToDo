import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { TextField, Button, Link } from "@mui/material";
import { useNavigate } from 'react-router-dom';


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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
            label="Senha"
            variant="outlined"
            fullWidth
            margin="normal"
            placeholder="Digite sua senha"
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
            <Link href="#" underline="hover">
              Crie uma conta
            </Link>
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
