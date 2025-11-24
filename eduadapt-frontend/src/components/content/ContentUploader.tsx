import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Paper, Typography } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { ContentService } from '../../services/contentService';

interface ContentUploaderProps {
  onContentProcessed: (title: string, text: string) => void;
}

export const ContentUploader: React.FC<ContentUploaderProps> = ({ onContentProcessed }) => {
  const [isLoading, setIsLoading] = useState(false);
  const contentService = new ContentService();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setIsLoading(true);
    try {
      const { title, text } = await contentService.processUploadedFile(file);
      onContentProcessed(title, text);
    } catch (error) {
      alert('Erreur lors du traitement du fichier.');
    } finally {
      setIsLoading(false);
    }
  }, [onContentProcessed]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'text/*': ['.txt'], 'application/pdf': ['.pdf'] },
    multiple: false,
  });

  return (
    <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
      <Box
        {...getRootProps()}
        sx={{
          border: '2px dashed #ccc',
          borderRadius: 1,
          p: 4,
          cursor: 'pointer',
          '&:hover': { borderColor: 'primary.main' },
        }}
      >
        <input {...getInputProps()} />
        <CloudUpload sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
        {isLoading ? (
          <Typography>Traitement du fichier...</Typography>
        ) : isDragActive ? (
          <Typography>Déposez le fichier ici...</Typography>
        ) : (
          <Typography>
            Glissez-déposez un fichier texte ou PDF ici, ou cliquez pour le sélectionner
          </Typography>
        )}
      </Box>
    </Paper>
  );
};