import React, { useState, useEffect, useRef } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import {
  Button,
  TextField,
  Box,
  Avatar,
  Snackbar,
  Alert,
  IconButton,
  CircularProgress,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PersonIcon from '@mui/icons-material/Person';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import WcIcon from '@mui/icons-material/Wc';
import BusinessIcon from '@mui/icons-material/Business';

const ProfileForm = () => {
  const fileInputRef = useRef(null);

  const { user, isLoading } = useTracker(() => {
    const handler = Meteor.subscribe('currentUserData');
    return {
      user: Meteor.user(),
      isLoading: !handler.ready(),
    };
  }, []);

  const [isEditing, setIsEditing] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const [formData, setFormData] = useState({
    email: '',
    nome: '',
    dataNascimento: '',
    sexo: '',
    empresa: '',
    foto: '',
  });

  useEffect(() => {
    if (user) {
      let aniversario = '';
      if (user.profile.dataNascimento) {
        const date = new Date(user.profile.dataNascimento);
        if (!isNaN(date.getTime())) {
          aniversario = date.toISOString().split('T')[0];
        }
      }
      setFormData({
        email: user.emails[0].address || '',
        nome: user.profile.nome || '',
        dataNascimento: aniversario || '',
        sexo: user.profile.sexo || '',
        empresa: user.profile.empresa || '',
        foto: user.profile.foto || '',
      });
    }
  }, [user]);

  if (isLoading) {
    return <CircularProgress color="inherit" />;
  }

  if (!user) {
    return <Box sx={{ p: 3 }}>Por favor, faça login para visualizar seu perfil.</Box>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    let aniversario = '';
    if (user.profile.dataNascimento) {
      const date = new Date(user.profile.dataNascimento);
      if (!isNaN(date.getTime())) {
        aniversario = date.toISOString().split('T')[0];
      }
    }
    setFormData({
      email: user.emails[0].address || '',
      nome: user.profile.nome || '',
      dataNascimento: aniversario || '',
      sexo: user.profile.sexo || '',
      empresa: user.profile.empresa || '',
      foto: user.profile.foto || '',
    });
    setIsEditing(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Meteor.call('users.updateProfile', formData, (error) => {
      if (error) {
        setSnackbar({
          open: true,
          message: `Erro ao atualizar perfil: ${error.reason}`,
          severity: 'error',
        });
      } else {
        setSnackbar({
          open: true,
          message: 'Perfil atualizado com sucesso!',
          severity: 'success',
        });
        setIsEditing(false);
      }
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handlePhotoClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          foto: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeletePhoto = () => {
    setFormData({
      ...formData,
      foto: '',
    });
  };

  return (
    <Box sx={{ p: 3, height: '70%', width: '70%', mt: 3 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          gap: 4,
          flexGrow: 1,
        }}
      >
        <Box
          sx={{
            width: { xs: '60%', sm: '60%', md: '32%', lg: '32%' },
            position: 'relative',
            flexShrink: 0,
          }}
        >
          <Avatar
            sx={{
              width: '100%',
              height: 'auto',
              aspectRatio: '1/1',
              border: '3px solid #6C8AB1',
            }}
            variant="square"
            src={formData.foto || ''}
          />
          {isEditing && (
            <>
              <input
                accept="image/*"
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 8,
                  right: 8,
                  display: 'flex',
                  gap: 1,
                }}
              >
                <IconButton
                  sx={{
                    bgcolor: '#6C8AB1',
                    '&:hover': { bgcolor: '#4A5C7E' },
                  }}
                  onClick={handlePhotoClick}
                  disabled={!isEditing}
                >
                  <PhotoCameraIcon sx={{ color: 'white' }} />
                </IconButton>

                {formData.foto && (
                  <IconButton
                    sx={{
                      bgcolor: '#d32f2f',
                      '&:hover': { bgcolor: '#b71c1c' },
                    }}
                    onClick={handleDeletePhoto}
                    disabled={!isEditing}
                  >
                    <DeleteOutlineIcon sx={{ color: 'white' }} />
                  </IconButton>
                )}
              </Box>
            </>
          )}
        </Box>

        <Box sx={{ flexGrow: 1, width: '100%' }}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              width: '100%',
            }}
          >
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={!isEditing}
              required
              variant="outlined"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#6C8AB1',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#6C8AB1',
                },
              }}
            />

            <TextField
              fullWidth
              label="Nome"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              disabled={!isEditing}
              required
              variant="outlined"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#6C8AB1',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#6C8AB1',
                },
              }}
            />

            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
              }}
            >
              <TextField
                fullWidth
                label="Sexo"
                name="sexo"
                value={formData.sexo}
                onChange={handleInputChange}
                disabled={!isEditing}
                variant="outlined"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <WcIcon />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#6C8AB1',
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#6C8AB1',
                  },
                }}
              />
              <TextField
                fullWidth
                label="Aniversário"
                name="dataNascimento"
                type="date"
                value={formData.dataNascimento}
                onChange={handleInputChange}
                disabled={!isEditing}
                variant="outlined"
                slotProps={{
                  inputLabel: { shrink: true },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#6C8AB1',
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#6C8AB1',
                  },
                }}
              />
            </Box>

            <TextField
              fullWidth
              label="Empresa"
              name="empresa"
              value={formData.empresa}
              onChange={handleInputChange}
              disabled={!isEditing}
              variant="outlined"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <BusinessIcon />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#6C8AB1',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#6C8AB1',
                },
              }}
            />
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2, mt: 3 }}>
        {!isEditing ? (
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={handleEditClick}
            sx={{
              bgcolor: '#6C8AB1',
              '&:hover': { bgcolor: '#4A5C7E' },
            }}
          >
            Editar Perfil
          </Button>
        ) : (
          <Box>
            <Button
              variant="outlined"
              startIcon={<CancelIcon />}
              onClick={handleCancelClick}
              sx={{
                mr: 1,
                borderColor: '#6C8AB1',
                color: '#6C8AB1',
                '&:hover': { borderColor: '#4A5C7E', color: '#4A5C7E' },
              }}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSubmit}
              sx={{
                bgcolor: '#6C8AB1',
                '&:hover': { bgcolor: '#4A5C7E' },
              }}
            >
              Salvar Alterações
            </Button>
          </Box>
        )}
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProfileForm;
