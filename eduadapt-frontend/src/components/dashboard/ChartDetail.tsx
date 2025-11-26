// src/components/dashboard/ChartDetail.tsx
import React from 'react';
import { Box, Typography, Modal, Button, Paper } from '@mui/material';

interface ChartDetailProps {
  open: boolean;
  onClose: () => void;
}

export const ChartDetail: React.FC<ChartDetailProps> = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="chart-detail-title"
      aria-describedby="chart-detail-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: 600 },
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 3,
        }}
      >
        <Typography id="chart-detail-title" variant="h6" component="h2" gutterBottom>
          Détail du Graphique de Progression
        </Typography>
        <Paper sx={{ p: 2, mt: 2, minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography id="chart-detail-description" color="text.secondary">
            (Intégration d'une librairie comme Recharts ou Chart.js sera faite ici)
          </Typography>
        </Paper>
        <Button onClick={onClose} sx={{ mt: 3 }}>
          Fermer
        </Button>
      </Box>
    </Modal>
  );
};