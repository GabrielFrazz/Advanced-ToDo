import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import {
  TextField,
  Button,
  Box,
  MenuItem,
  Select,
  FormControl,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import InputAdornment from '@mui/material/InputAdornment';
import TaskOutlinedIcon from '@mui/icons-material/TaskOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams } from 'react-router-dom';
import { TasksCollection } from '../../api/TasksCollection';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

export default EditTaskForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setFormData({
      tarefa: task.name,
      descricao: task.descricao,
      data: task.data,
      pessoal: task.pessoal ? 'pessoal' : 'publica',
    });
    setIsEditing(false);
  };

  const { task, isLoading } = useTracker(() => {
    const handler = Meteor.subscribe('tasks.filter', { _id: id });
    return {
      task: TasksCollection.findOne({ _id: id }),
      isLoading: !handler.ready(),
    };
  }, []);

  console.log(task);
  console.log(id);

  const [formData, setFormData] = useState({
    tarefa: '',
    descricao: '',
    data: '',
    pessoal: 'visibilidade',
  });

  useEffect(() => {
    if (task) {
      setFormData({
        tarefa: task.name,
        descricao: task.descricao,
        data: task.data,
        pessoal: task.pessoal ? 'pessoal' : 'publica',
      });
    }
  }, [task]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updates = {
      name: formData.tarefa,
      descricao: formData.descricao,
      data: formData.data,
      pessoal: formData.pessoal === 'pessoal',
    };

    Meteor.call('tasks.update', { _id: id, updates }, (error) => {
      if (error) {
        setSnackbarMessage(`Erro ao editar tarefa: ${error.message}`);
      } else {
        setSnackbarMessage('Tarefa editada com sucesso!');
        setIsEditing(false);
      }

      setOpenSnackbar(true);
    });
  };

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Box component="form" className="task-form">
      <Box sx={{ flex: '1 0 auto' }}>
        <TextField
          size="medium"
          name="tarefa"
          label="Tarefa"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <TaskOutlinedIcon />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            mb: 2,
          }}
          variant="standard"
          fullWidth
          disabled={!isEditing}
          margin="normal"
          placeholder="Digite seu nome"
          value={formData.tarefa}
          onChange={handleInputChange}
        />

        <TextField
          size="medium"
          label="Descrição"
          name="descricao"
          multiline
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <InfoOutlinedIcon />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            mb: 2,
          }}
          variant="standard"
          fullWidth
          disabled={!isEditing}
          margin="normal"
          placeholder="Digite a descrição da tarefa"
          value={formData.descricao}
          onChange={handleInputChange}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '50%',
          }}
        >
          <Box sx={{ mr: 3 }}>
            <TextField
              size="small"
              label="data"
              name="data"
              variant="standard"
              disabled={!isEditing}
              margin="normal"
              type="date"
              slotProps={{
                inputLabel: { shrink: true },
              }}
              value={formData.data}
              onChange={handleInputChange}
            />
          </Box>

          <Box sx={{ width: '25%', mt: 3.9, ml: 2 }}>
            <FormControl fullWidth size="small">
              <Select
                value={formData.pessoal}
                name="pessoal"
                variant="standard"
                disabled={!isEditing}
                onChange={handleInputChange}
                sx={{
                  height: '30px',
                  fontSize: '14px',
                  fontFamily: 'Poppins',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#4A5C7E',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#4A5C7E',
                  },
                }}
              >
                <MenuItem value="publica">publica</MenuItem>
                <MenuItem value="pessoal">pessoal</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginTop: '15vh',
            mb: 2,
          }}
        >
          <Button
            type="button"
            onClick={() => navigate('/tasks')}
            variant="text"
            startIcon={<ArrowBackIcon />}
            className="back-button"
            sx={{
              marginRight: 2,
              marginBottom: '10px',
              padding: '8px 16px',
              color: '#5A72A0',
              fontWeight: 500,
              textTransform: 'none',
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: 'rgba(74, 92, 126, 0.08)',
              },
            }}
          >
            Voltar para tarefas
          </Button>

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
                Editar Tarefa
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
        </Box>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarMessage.includes('Erro') ? 'error' : 'success'}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};
