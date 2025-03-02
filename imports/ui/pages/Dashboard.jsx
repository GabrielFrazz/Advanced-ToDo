import { Meteor } from 'meteor/meteor';
import { useTracker, useSubscribe } from 'meteor/react-meteor-data';
import React from 'react';
import { Box, Typography } from '@mui/material';
import TopBar from '../components/TopBar';
import Sidebar from '../components/SideBar';
import { TasksCollection } from '../../api/TasksCollection';
import { CircularProgress } from '@mui/material';

const Dashboard = () => {
  const isLoading = useSubscribe('tasks.user');

  const cadastradas = useTracker(() => TasksCollection.find({ status: 'to-do' }).count());

  const emAndamento = useTracker(() => TasksCollection.find({ status: 'in_progress' }).count());

  const concluidas = useTracker(() => TasksCollection.find({ status: 'completed' }).count());

  console.log(cadastradas);
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
              height: 'calc(85vh - 64px - 48px)',
              alignContent: 'center',
            }}
          >
            <Box
              className="title"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                height: '7vh',
                width: '100%',
                marginBottom: 0,
                borderRadius: 2,
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
                Dashboard
              </Typography>
            </Box>

            <Box
              className="main"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                flexGrow: 1,
                width: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderRadius: 1,
                overflow: 'auto',
                height: 'calc(85vh - 64px - 48px)',
                alignContent: 'center',
              }}
            >
              <Box
                className="dashboard-cards"
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'cneter',
                  flexDirection: 'column',
                  height: '35%',
                  width: '30%',
                  bgcolor: 'rgba(255, 255, 255, 0.5)',
                  borderRadius: 2,
                  boxShadow: 3,
                  p: 3,
                  m: 3,
                  mt: '3.3vh',
                  textAlign: 'center',
                  color: '#4A5C7E',
                  overflow: 'hidden',
                }}
              >
                {isLoading() ? (
                  <>
                    <Typography
                      variant="h4"
                      sx={{
                        margin: '16px',
                        marginTop: '0',
                        fontSize: '4vh',
                        fontFamily: 'Poppins',
                      }}
                    >
                      Cadastradas
                    </Typography>
                    <CircularProgress />
                  </>
                ) : (
                  <>
                    <Typography
                      variant="h4"
                      sx={{
                        margin: '16px',
                        marginTop: '0',
                        fontSize: '4vh',
                        fontFamily: 'Poppins',
                      }}
                    >
                      Cadastradas
                    </Typography>
                    <Typography
                      variant="h2"
                      sx={{
                        fontSize: '7vh',
                        fontFamily: 'Poppins',
                        color: '#4A90E2',
                      }}
                    >
                      {cadastradas}
                    </Typography>
                  </>
                )}
              </Box>

              <Box
                className="dashboard-cards"
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'cneter',
                  flexDirection: 'column',
                  height: '35%',
                  width: '30%',
                  bgcolor: 'rgba(255, 255, 255, 0.5)',
                  borderRadius: 2,
                  boxShadow: 3,
                  p: 3,
                  m: 3,
                  mt: '3.3vh',
                  textAlign: 'center',
                  color: '#4A5C7E',
                  overflow: 'hidden',
                }}
              >
                {isLoading() ? (
                  <>
                    <Typography
                      variant="h4"
                      sx={{
                        margin: '16px',
                        marginTop: '0',
                        fontSize: '4vh',
                        fontFamily: 'Poppins',
                      }}
                    >
                      Em andamento
                    </Typography>
                    <CircularProgress />
                  </>
                ) : (
                  <>
                    <Typography
                      variant="h4"
                      sx={{
                        margin: '16px',
                        marginTop: '0',
                        fontSize: '4vh',
                        fontFamily: 'Poppins',
                      }}
                    >
                      Em andamento
                    </Typography>
                    <Typography
                      variant="h2"
                      sx={{
                        fontSize: '7vh',
                        fontFamily: 'Poppins',
                        color: '#F5A623',
                      }}
                    >
                      {emAndamento}
                    </Typography>
                  </>
                )}
              </Box>

              <Box
                className="dashboard-cards"
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'cneter',
                  flexDirection: 'column',
                  height: '35%',
                  width: '30%',
                  bgcolor: 'rgba(255, 255, 255, 0.5)',
                  borderRadius: 2,
                  boxShadow: 3,
                  p: 3,
                  m: 3,
                  mt: '3.3vh',
                  textAlign: 'center',
                  color: '#4A5C7E',
                  overflow: 'hidden',
                }}
              >
                {isLoading() ? (
                  <>
                    <Typography
                      variant="h4"
                      sx={{
                        margin: '16px',
                        marginTop: '0',
                        fontSize: '4vh',
                        fontFamily: 'Poppins',
                      }}
                    >
                      Concluídas
                    </Typography>
                    <CircularProgress />
                  </>
                ) : (
                  <>
                    <Typography
                      variant="h4"
                      sx={{
                        margin: '16px',
                        marginTop: '0',
                        fontSize: '4vh',
                        fontFamily: 'Poppins',
                      }}
                    >
                      Concluídas
                    </Typography>
                    <Typography
                      variant="h2"
                      sx={{
                        fontSize: '7vh',
                        fontFamily: 'Poppins',
                        color: '#7ED321',
                      }}
                    >
                      {concluidas}
                    </Typography>
                  </>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
