import { Meteor } from 'meteor/meteor';
import { useTracker, useSubscribe } from 'meteor/react-meteor-data';
import React from 'react';
import { Box, Typography, CircularProgress, Button, Chip, TextField } from '@mui/material';
import TopBar from '../components/TopBar';
import Sidebar from '../components/SideBar';
import { TasksCollection } from '../../api/TasksCollection';
import { Task } from '../components/Task';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';

const Tasks = () => {
  const navigate = useNavigate();

  const [filter, setFilter] = React.useState({
    $or: [{ userId: Meteor.userId() }],
    status: { $in: ['to-do', 'in_progress', 'completed'] },
  });

  const [search, setSearch] = React.useState('');

  const [showPublicTasks, setShowPublicTasks] = React.useState(false);
  const [hideCompletedTasks, setHideCompletedTasks] = React.useState(false);

  const [disableChip, setDisableChip] = React.useState(false);

  React.useEffect(() => {
    let newFilter = {};

    if (search) {
      setDisableChip(true);
      newFilter = {
        $and: [
          { $or: [{ userId: Meteor.userId() }, { pessoal: false }] },
          { name: { $regex: search, $options: 'i' } },
        ],
        status: { $in: ['to-do', 'in_progress', 'completed'] },
      };
    } else {
      setDisableChip(false);
      if (showPublicTasks) {
        newFilter = {
          $or: [{ userId: Meteor.userId() }, { pessoal: false }],
        };
      } else {
        newFilter = {
          userId: Meteor.userId(),
        };
      }

      if (hideCompletedTasks) {
        newFilter.status = { $in: ['to-do', 'in_progress'] };
      } else {
        newFilter.status = { $in: ['to-do', 'in_progress', 'completed'] };
      }
    }

    setFilter(newFilter);
  }, [showPublicTasks, hideCompletedTasks, search]);

  const isLoading = useSubscribe('tasks.filter', filter);

  const { tasks, isTasksLoading } = useTracker(() => {
    const noDataAvailable = { tasks: [] };

    if (isLoading()) {
      return { ...noDataAvailable, isTasksLoading: true };
    }

    const tasks = TasksCollection.find({}, { sort: { data: -1 } }).fetch();

    return { tasks, isTasksLoading: false };
  });

  const deleteTask = (task) => {
    Meteor.call('tasks.delete', { _id: task._id }, (error) => {
      if (error) {
        console.error('Error deleting task:', error);
      }
    });
  };

  const updateTaskStatus = (task, newStatus) => {
    Meteor.call(
      'tasks.updateStatus',
      {
        _id: task._id,
        newStatus: newStatus,
      },
      (error) => {
        if (error) {
          console.error('Error updating task status:', error);
        }
      }
    );
  };

  const handleAddNewTask = () => {
    navigate('/add-task');
  };

  const togglePublicTasks = () => {
    setShowPublicTasks(!showPublicTasks);
  };

  const toggleCompletedTasks = () => {
    setHideCompletedTasks(!hideCompletedTasks);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <Box className="wallpaper-page-principal">
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <TopBar />
        <Box sx={{ display: 'flex', flexGrow: 1, pt: '64px' }}>
          <Sidebar />

          <Box
            className="wrapper"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              ml: '240px',
              m: 3,
              width: { sm: `calc(100% - 240px - 48px)` },
              backgroundColor: 'rgba(255, 255, 255, 0)',
              borderRadius: 2,
              overflow: 'auto',
              alignContent: 'center',
            }}
          >
            <Box
              className="title"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                height: '9vh',
                width: '94%',
                ml: '3rem',
                marginBottom: 0,
                marginTop: 2,
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  margin: '16px',
                  marginTop: '0',
                  fontFamily: 'Poppins',
                  fontWeight: 400,
                  fontSize: '5vh',
                  letterSpacing: '0.5px',
                  mb: 0,
                  color: '#4A5C7E',
                }}
              >
                Tarefas
              </Typography>

              <Button
                onClick={handleAddNewTask}
                type="submit"
                variant="contained"
                className="task-button"
                sx={{
                  height: '5vh',
                  width: '23vh',
                  borderRadius: 1,
                  color: 'primary',
                  opacity: 0.7,
                }}
              >
                Adicionar nova
              </Button>
              <Box sx={{ ml: 3, display: 'flex', gap: 1, alignItems: 'center' }}>
                <Chip
                  label="Tarefas públicas"
                  clickable
                  disabled={disableChip}
                  onClick={togglePublicTasks}
                  color={showPublicTasks ? 'primary' : 'default'}
                  variant={showPublicTasks ? 'filled' : 'outlined'}
                  sx={{
                    fontFamily: 'Poppins',
                    height: '32px',
                    borderRadius: 1,
                    '& .MuiChip-label': { px: 2 },
                  }}
                />

                <Chip
                  label="Ocultar completas"
                  clickable
                  disabled={disableChip}
                  onClick={toggleCompletedTasks}
                  color={hideCompletedTasks ? 'primary' : 'default'}
                  variant={hideCompletedTasks ? 'filled' : 'outlined'}
                  sx={{
                    fontFamily: 'Poppins',
                    height: '32px',
                    borderRadius: 1,
                    '& .MuiChip-label': { px: 2 },
                  }}
                />
              </Box>

              <Box sx={{ width: '40%', ml: '4rem', alignItems: 'center' }}>
                <TextField
                  fullWidth
                  placeholder="Pesquisar tarefas..."
                  autoComplete="off"
                  value={search}
                  onChange={handleSearch}
                  variant="outlined"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    },
                  }}
                  sx={{
                    fontFamily: 'Poppins',
                    borderRadius: 5,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 5,
                      height: '35px',
                      backgroundColor: 'rgba(255, 255, 255, 0.7)',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      },
                      '& fieldset': {
                        borderColor: 'rgba(0, 0, 0, 0.1)',
                      },
                    },
                  }}
                />
              </Box>
            </Box>

            <Box
              className="main"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                width: '93%',
                borderRadius: 3,
                bgcolor: 'rgba(255, 255, 255, 0.7)',
                ml: '4rem',
                overflow: 'auto',
                boxShadow: 5,
                marginBottom: 2,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px 16px',
                }}
              >
                <Box sx={{ width: '40px' }}></Box>
                <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                  <Typography
                    sx={{
                      fontFamily: 'Poppins',
                      fontWeight: 500,
                      fontSize: '14px',
                      width: '93%',
                      color: '#4A5C7E',
                    }}
                  >
                    Tarefa
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: 'Poppins',
                      fontWeight: 500,
                      fontSize: '14px',
                      width: '20%',
                      color: '#4A5C7E',
                    }}
                  >
                    Usuário
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: 'Poppins',
                      fontWeight: 500,
                      fontSize: '14px',
                      width: '20%',
                      color: '#4A5C7E',
                    }}
                  >
                    Status
                  </Typography>
                </Box>
                <Box sx={{ width: '65px', mr: 0 }}>
                  <Typography
                    sx={{
                      fontFamily: 'Poppins',
                      fontWeight: 500,
                      fontSize: '14px',
                      width: '100%',
                      color: '#4A5C7E',
                    }}
                  >
                    Ações
                  </Typography>
                </Box>
              </Box>

              {isTasksLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                  <CircularProgress sx={{ color: '#4A5C7E' }} />
                </Box>
              ) : tasks.length > 0 ? (
                tasks.map((task) => (
                  <Task
                    key={task._id}
                    task={task}
                    onDeleteClick={deleteTask}
                    onStatusChange={updateTaskStatus}
                  />
                ))
              ) : (
                <Box
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Box
                    component="img"
                    src="/images/wired-outline-262-emoji-wow-hover-pinch.gif"
                    alt="Empty tasks"
                    sx={{
                      width: 300,
                      height: 300,
                      mt: 5,
                      mb: 2,
                      objectFit: 'cover',
                      borderRadius: 1,
                      color: 'text.secondary',
                    }}
                  />
                  <Typography
                    color="textSecondary"
                    sx={{ mt: 1, fontFamily: 'Poppins', fontSize: '24px' }}
                  >
                    Você não tem tarefas!
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Tasks;
