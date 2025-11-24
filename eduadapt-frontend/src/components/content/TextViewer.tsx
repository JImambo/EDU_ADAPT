import React from 'react';
import { Paper, Typography } from '@mui/material';

interface TextViewerProps {
  title: string;
  text: string;
}

export const TextViewer: React.FC<TextViewerProps> = ({ title, text }) => {
  return (
    <Paper elevation={2} sx={{ p: 3, maxHeight: 400, overflowY: 'auto' }}>
      <Typography variant="h5" gutterBottom>{title}</Typography>
      <Typography variant="body1" component="pre" sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
        {text}
      </Typography>
    </Paper>
  );
};