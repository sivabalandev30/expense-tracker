// src/components/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static" className="mb-6">
      <Toolbar className="justify-center">
        <Typography variant="h5" component="div">
          💸 Expense Tracker Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
