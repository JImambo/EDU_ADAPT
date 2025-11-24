import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { ProgressData } from '../../hooks/useProgress';

interface StatsDisplayProps {
  progress: ProgressData;
  totalExercisesCount: number;
}

export const StatsDisplay: React.FC<StatsDisplayProps> = ({ progress, totalExercisesCount }) => {
  const averageScore = Object.values(progress.scores).length > 0
    ? Object.values(progress.scores).reduce((a, b) => a + b, 0) / Object.values(progress.scores).length
    : 0;

  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      <Grid item xs={12} sm={4}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Exercices complétés
            </Typography>
            <Typography variant="h5">
              {progress.completedExercises.length} / {totalExercisesCount}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Score moyen
            </Typography>
            <Typography variant="h5">
              {averageScore.toFixed(1)} %
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Temps total
            </Typography>
            <Typography variant="h5">
              {Math.round(progress.totalTime / 60)} min
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};