import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { TextField, Button, Link } from "@mui/material";

export default LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    Meteor.loginWithPassword(username, password);
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
            onChange={(e) => setPassword(e.target.value)}
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
