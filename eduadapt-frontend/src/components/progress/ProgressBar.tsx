import React from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';

interface ProgressBarProps {
  value: number; // Pourcentage
  label?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ value, label }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {/* Ajout du label s'il est fourni */}
        {label && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1}}>
                {label}
            </Typography>
        )}
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" value={value} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(value)}%`}</Typography>
      </Box>
    </Box>
  );
};