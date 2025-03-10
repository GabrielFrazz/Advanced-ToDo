import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { CircularProgress, Box } from '@mui/material';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import TaskAdd from './pages/TaskAdd';
import Profile from './pages/Profile';
import TaskEdit from './pages/TaskEdit';

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useTracker(() => {
    const currentUser = Meteor.user();

    if (currentUser) {
      return { user: currentUser, isLoading: false };
    }

    const handler = Meteor.subscribe('currentUserData');
    const isLoading = !handler.ready();
    const user = Meteor.user();
    return { user, isLoading };
  });

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100vw',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
        }}
      >
        <CircularProgress size={60} thickness={4} sx={{ color: '#4A5C7E' }} />
      </Box>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-task/"
          element={
            <ProtectedRoute>
              <TaskAdd />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-task/:id"
          element={
            <ProtectedRoute>
              <TaskEdit />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
