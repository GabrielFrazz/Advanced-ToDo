import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect } from 'react';
import { TextField, Button, Link as MuiLink, Box, Typography } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import WcIcon from '@mui/icons-material/Wc';
import BusinessIcon from '@mui/icons-material/Business';
import KeyIcon from '@mui/icons-material/Key';

export default LoginForm = () => {
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [sexo, setSexo] = useState('');
  const [aniversario, setAniversario] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (password && password2) {
      if (password !== password2) {
        setPasswordError('As senhas não correspondem');
      } else {
        setPasswordError('');
      }
    }
  }, [password, password2]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      setPasswordError('As senhas não correspondem');
      return;
    }

    setPasswordError('');
    setEmailError('');

    Meteor.call(
      'users.signupFull',
      {
        nome: nome,
        email: email,
        dataNascimento: aniversario,
        sexo: sexo,
        empresa: empresa,
        password: password,
      },
      (error, userId) => {
        if (error) {
          console.error('Erro no signup:', error.reason);
          if (error.error === 'email-already-exists') {
            setEmailError(error.reason);
          } else {
            setError(error.reason);
          }
        } else {
          console.log('Usuário cadastrado com sucesso. ID:', userId);
          setSuccess(true);
        }
      }
    );
  };

  return (
    <Box className="login-wrapper">
      <Box className="register-container">
        <Typography variant="h5" className="login-title">
          Cadastre-se
        </Typography>
        {success ? (
          <Box className="success-message">
            <Typography variant="body1" className="success">
              Cadastro realizado com sucesso!
            </Typography>
            <Button variant="contained" onClick={() => navigate('/login')} className="login-button">
              Ir para Login
            </Button>
          </Box>
        ) : (
          <Box component="form" className="login-form" onSubmit={handleSubmit}>
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
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError('');
              }}
              error={Boolean(emailError)}
              helperText={emailError}
            />

            <Box className="register-sex-birthday">
              <Box className="register-sex">
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
                          <WcIcon />
                        </InputAdornment>
                      ),
                    },
                  }}
                  value={sexo}
                  onChange={(e) => setSexo(e.target.value)}
                />
              </Box>
              <Box className="register-aniversario">
                <TextField
                  size="small"
                  label="Aniversário"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type="date"
                  slotProps={{
                    inputLabel: { shrink: true },
                  }}
                  value={aniversario}
                  onChange={(e) => setAniversario(e.target.value)}
                />
              </Box>
            </Box>
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
                      <BusinessIcon />
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
                      <KeyIcon />
                    </InputAdornment>
                  ),
                },
              }}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (passwordError) setPasswordError('');
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
                      <KeyIcon />
                    </InputAdornment>
                  ),
                },
              }}
              value={password2}
              onChange={(e) => {
                setPassword2(e.target.value);
                if (passwordError) setPasswordError('');
              }}
              error={Boolean(passwordError)}
              helperText={passwordError}
            />

            <Box className="extra-links">
              <MuiLink component={RouterLink} to="/login" underline="hover">
                Já tem uma conta? Faça login
              </MuiLink>
            </Box>

            <Button type="submit" variant="contained" fullWidth className="login-button">
              Cadastrar
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};
