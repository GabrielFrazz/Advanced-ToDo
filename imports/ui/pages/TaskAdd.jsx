import React from 'react';
import { Box, Typography } from '@mui/material';
import TopBar from '../components/TopBar';
import Sidebar from '../components/SideBar';
import TaskForm from '../components/TaskForm';

const TaskAdd = () => {
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
                height: '9vh',
                width: '90%',
                ml: '3rem',
                marginBottom: 0,
                marginTop: 2,
              }}
            >
              <Typography
                variant="h4"
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
                Adicionar Tarefa
              </Typography>
            </Box>

            <Box
              className="main"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                width: '93%',
                height: '71vh',
                borderRadius: 3,
                bgcolor: 'rgba(255, 255, 255, 0.7)',
                ml: '4rem',
                overflow: 'auto',
                boxShadow: 5,
                marginBottom: 2,
              }}
            >
              <TaskForm />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TaskAdd;
