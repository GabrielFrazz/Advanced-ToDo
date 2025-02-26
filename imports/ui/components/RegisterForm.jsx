import { Meteor } from "meteor/meteor";
import React, { useState, useEffect } from "react";
import { TextField, Button, Link as MuiLink } from "@mui/material";
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import WcIcon from '@mui/icons-material/Wc';
import BusinessIcon from '@mui/icons-material/Business';
import KeyIcon from '@mui/icons-material/Key';


export default LoginForm = () => {
  const navigate = useNavigate();

  const[nome, setNome] = useState("");
  const[email, setEmail] = useState("");
  const[sexo, setSexo] = useState("");
  const[aniversario, setAniversario] = useState("");
  const[empresa, setEmpresa] = useState("");
  const[password, setPassword] = useState("");    
  const[password2, setPassword2] = useState("");


  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    
    if (password && password2) {
      if (password !== password2) {
        setPasswordError("As senhas não correspondem");
      } else {
        setPasswordError("");
      }
    }
  }, [password, password2]); 

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (password !== password2) {
      setPasswordError("As senhas não correspondem");
      return;
    }
    
    setPasswordError("");

    Meteor.call('users.signupFull', {
        nome: nome,
        email: email,
        dataNascimento: aniversario,
        sexo: sexo,
        empresa: empresa,
        password: password
    }, (error, userId) => {
        if (error) {
          console.error('Erro no signup:', error.reason);
          setError(error.reason);
        } else {
          console.log('Usuário cadastrado com sucesso. ID:', userId);
          setSuccess(true);
        }
    });
  };

  return (
    <div className="login-wrapper">
      <div className="register-container">
        <h2 className="login-title">Cadastre-se</h2>
        {success ? (
          <div className="success-message">
            <p className="success">Cadastro realizado com sucesso!</p>
            <Button
              variant="contained"
              onClick={() => navigate("/login")}
              className="login-button"
            >
              Ir para Login
            </Button>
          </div>
        ) : (
        <form className="login-form" onSubmit={handleSubmit}>
          <TextField
            size="small"
            label="Nome"
            slotProps={{
                input: {
                    startAdornment: (
                        <InputAdornment position="start">
                            <PersonIcon />
                        </InputAdornment>
                    ),
                },
            }}
            variant="outlined"
            fullWidth
            margin="normal"
            placeholder="Digite seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            
          />

          <TextField
            size="small"
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

        <div className="register-sex-birthday">
            <TextField  
                size="small"
                label="Sexo"
                variant="outlined"
                fullWidth
                margin="normal"
                placeholder="Digite seu sexo"
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <WcIcon/>
                            </InputAdornment>
                        ),
                    },
                }}
                value={sexo}
                onChange={(e) => setSexo(e.target.value)}
            />

            <TextField  
                size="small"
                label="Aniversário"
                variant="outlined"
                fullWidth
                margin="normal"
                type="date"
                slotProps={{
                    inputLabel: { shrink: true }
                }}
                value={aniversario}
                onChange={(e) => setAniversario(e.target.value)}
            />
        </div>
            <TextField  
                size="small"
                label="Empresa"
                variant="outlined"
                fullWidth
                margin="normal"
                placeholder="Digite sua empresa"
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <BusinessIcon/>
                            </InputAdornment>
                        ),
                    },
                }}
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
            />

            <TextField
                size="small"
                label="Senha"
                variant="outlined"
                fullWidth
                margin="normal"
                placeholder="Digite sua senha"
                type="password"
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <KeyIcon/>
                            </InputAdornment>
                        ),
                    },
                }}
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError) setPasswordError("");
                }}
                error={Boolean(error || passwordError)}
                helperText={error}
            />

            <TextField
                size="small"
                label="Confirme sua senha"
                variant="outlined"
                fullWidth
                margin="normal"
                placeholder="Digite sua senha novamente"
                type="password"
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <KeyIcon/>
                            </InputAdornment>
                        ),
                    },
                }}
                value={password2}
                onChange={(e) => {
                    setPassword2(e.target.value);
                    if (passwordError) setPasswordError("");
                }}
                error={Boolean(passwordError)}
                helperText={passwordError}
            />

           <div className="extra-links">
                <MuiLink component={RouterLink} to="/login" underline="hover">
                    Já tem uma conta? Faça login
                </MuiLink>
            </div>

          <Button 
            type="submit" 
            variant="contained" 
            fullWidth
            className="login-button"
          >
            Cadastrar
          </Button>
        </form>
        )}
      </div>
    </div>
  );
};
