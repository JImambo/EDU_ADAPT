import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

interface StatsDisplayProps {
  progress: {
    scores: { [key: string]: number };
  };
  totalExercisesCount: number;
}

export const StatsDisplay: React.FC<StatsDisplayProps> = ({ progress, totalExercisesCount }) => {
  // Calcule le score moyen
  const scores = Object.values(progress.scores);
  const averageScore = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length) : 0;

  return (
    // On remplace <Grid container> par un <Box> en flexbox
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
      {/* On remplace <Grid item> par un <Box> avec flexBasis pour la taille */}
      <Box sx={{ flexGrow: 1, flexBasis: { xs: '100%', md: '50%' } }}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h3" gutterBottom>
              Score Moyen
            </Typography>
            <Typography variant="h4" component="p" color="primary.main">
              {averageScore.toFixed(1)} / 100
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ flexGrow: 1, flexBasis: { xs: '100%', md: '50%' } }}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h3" gutterBottom>
              Exercices Terminés
            </Typography>
            <Typography variant="h4" component="p" color="secondary.main">
            {totalExercisesCount}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};