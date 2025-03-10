import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  MenuItem,
  Select,
  FormControl,
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import InputAdornment from '@mui/material/InputAdornment';
import TaskOutlinedIcon from '@mui/icons-material/TaskOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default TaskForm = () => {
  const navigate = useNavigate();

  const [tarefa, setTarefa] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState('');
  const [pessoal, setPessoal] = useState('visibilidade');

  const [errorTarefa, setErrorTarefa] = useState('');
  const [errorDescricao, setErrorDescricao] = useState('');
  const [errorData, setErrorData] = useState('');
  const [errorVisibilidade, setErrorVisibilidade] = useState('');

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    let erros = false;

    if (pessoal === 'visibilidade') {
      setErrorVisibilidade('Selecione a visibilidade da tarefa');
      erros = true;
    }
    if (tarefa === '') {
      setErrorTarefa('Digite o nome da tarefa');
      erros = true;
    }
    if (!descricao) {
      setErrorDescricao('Digite a descrição da tarefa');
      erros = true;
    }
    if (!data) {
      setErrorData('Selecione a data da tarefa');
      erros = true;
    }

    if (erros) return;

    let personalBool = false;

    if (pessoal === 'pessoal') {
      personalBool = true;
    }

    Meteor.call(
      'tasks.insert',
      {
        name: tarefa,
        descricao: descricao,
        data: data,
        pessoal: personalBool,
      },
      (error) => {
        if (error) {
          console.error('Error creating task:', error);
          setSnackbarMessage('Erro ao criar tarefa: ' + error.message);
          setOpenSnackbar(true);
        } else {
          setSnackbarMessage('Tarefa cadastrada com sucesso!');
          setOpenSnackbar(true);

          setTarefa('');
          setDescricao('');
          setData('');
          setPessoal('visibilidade');
        }
      }
    );
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Box component="form" className="task-form" onSubmit={handleSubmit}>
      <Box sx={{ flex: '1 0 auto' }}>
        <TextField
          size="medium"
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
          margin="normal"
          placeholder="Digite a tarefa"
          value={tarefa}
          onChange={(e) => {
            if (errorTarefa) setErrorTarefa('');
            setTarefa(e.target.value);
          }}
          error={Boolean(errorTarefa)}
          helperText={errorTarefa}
        />

        <TextField
          size="medium"
          label="Descrição"
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
          margin="normal"
          placeholder="Digite a descrição da tarefa"
          value={descricao}
          onChange={(e) => {
            if (errorDescricao) setErrorDescricao('');
            setDescricao(e.target.value);
          }}
          error={Boolean(errorDescricao)}
          helperText={errorDescricao}
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
              variant="standard"
              margin="normal"
              type="date"
              slotProps={{
                inputLabel: { shrink: true },
              }}
              value={data}
              onChange={(e) => {
                if (errorData) setErrorData('');
                setData(e.target.value);
              }}
              error={Boolean(errorData)}
              helperText={errorData}
            />
          </Box>

          <Box sx={{ width: '22%', mt: 3.9, ml: 2 }}>
            <FormControl
              fullWidth
              size="small"
              error={errorVisibilidade}
              helperText={errorVisibilidade}
            >
              <Select
                value="visibilidade"
                variant="standard"
                onChange={(e) => {
                  if (errorVisibilidade) setErrorVisibilidade('');
                  setPessoal(e.target.value);
                }}
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
                renderValue={(value) => pessoal}
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

          <Button
            type="submit"
            variant="contained"
            className="task-button"
            sx={{
              width: '20%',
              marginBottom: '10px',
              padding: '10px',
              backgroundColor: '#2E3B55',
              color: '#fff',
            }}
          >
            criar tarefa
          </Button>
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
