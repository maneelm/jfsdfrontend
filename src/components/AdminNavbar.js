// AdminNavbar.js
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, AppBar, Toolbar, Typography, Box } from '@mui/material';
import { PersonAdd, People, Event, EventNote, Logout } from '@mui/icons-material';
import './AdminNavbar.css';
import Cookies from 'js-cookie';

const AdminNavbar = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = Cookies.get('authToken');
    if (!authToken) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    Cookies.remove('authToken');
    navigate('/');
  };

  return (
    <AppBar position="static" className="navbar">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/dashboard" className="navbar-title">
          Admin Dashboard
        </Typography>
        <Box className="button-group">
          <Button
            component={Link}
            to="/upload"
            className="nav-button"
            startIcon={<PersonAdd />}
          >
            Add Student
          </Button>
          <Button
            component={Link}
            to="/view-students"
            className="nav-button"
            startIcon={<People />}
          >
            View Students
          </Button>
          <Button
            component={Link}
            to="/createEvent"
            className="nav-button"
            startIcon={<Event />}
          >
            Add Event
          </Button>
          <Button
            component={Link}
            to="/ViewEvent"
            className="nav-button"
            startIcon={<EventNote />}
          >
            View Events
          </Button>
          <Button
            onClick={handleLogout}
            className="nav-button logout-button"
            startIcon={<Logout />}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavbar;