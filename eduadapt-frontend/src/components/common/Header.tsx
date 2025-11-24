// import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';

export const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <SchoolIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          EduAdapt
        </Typography>
        <Box>
          {/* Ici, on pourrait ajouter un menu utilisateur, etc. */}
        </Box>
      </Toolbar>
    </AppBar>
  );
};