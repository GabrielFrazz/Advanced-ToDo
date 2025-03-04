import { Meteor } from 'meteor/meteor';
import { useTracker, useSubscribe } from 'meteor/react-meteor-data';
import React from 'react';
import { Box, Typography, CircularProgress, Button } from '@mui/material';
import TopBar from '../components/TopBar';
import Sidebar from '../components/SideBar';
import { TasksCollection } from '../../api/TasksCollection';
import { Task } from '../components/Task';
import { useNavigate } from 'react-router-dom';

const Tasks = () => {
  const navigate = useNavigate();
  const isLoading = useSubscribe('tasks.user');

  const { tasks, isTasksLoading } = useTracker(() => {
    const noDataAvailable = { tasks: [] };

    if (isLoading()) {
      return { ...noDataAvailable, isTasksLoading: true };
    }

    const tasks = TasksCollection.find({}, { sort: { createdAt: -1 } }).fetch();

    return { tasks, isTasksLoading: false };
  });

  const toggleChecked = (task) => {
    Meteor.call(
      'tasks.update',
      {
        _id: task._id,
        updates: { isChecked: !task.isChecked },
      },
      (error) => {
        if (error) {
          console.error('Error updating task:', error);
        }
      }
    );
  };

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
                width: '90%',
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
                    onCheckboxClick={toggleChecked}
                    onDeleteClick={deleteTask}
                    onStatusChange={updateTaskStatus}
                  />
                ))
              ) : (
                <Box sx={{ p: 3, textAlign: 'center' }}>
                  <Typography color="textSecondary">Você não tem tarefas!</Typography>
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
