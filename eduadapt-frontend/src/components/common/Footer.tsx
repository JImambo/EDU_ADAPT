// import React from 'react';
import { Box, Typography, Container } from '@mui/material';

export const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          {'© '}
          {new Date().getFullYear()}
          {' EduAdapt. Tous droits réservés.'}
        </Typography>
      </Container>
    </Box>
  );
};