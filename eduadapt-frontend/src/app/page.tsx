'use client';

import { useState } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Grid } from '@mui/material';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { Loading } from '../components/common/Loading';
import { ContentUploader } from '../components/content/ContentUploader';
import { TextViewer } from '../components/content/TextViewer';
import { Quiz } from '../components/exercises/Quiz';
import { ProgressBar } from '../components/progress/ProgressBar';
import { StatsDisplay } from '../components/progress/StatsDisplay';
import { useProgress } from '../hooks/useProgress';
import { ExerciseService } from '../services/exerciseService';
import { Exercise } from '../types/exercise';
import { trackEvent } from '../utils/analytics';

export default function Home() {
  const [contentTitle, setContentTitle] = useState<string>('');
  const [contentText, setContentText] = useState<string>('');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { progress, updateProgress, getCompletionRate } = useProgress();

  const handleContentProcessed = (title: string, text: string) => {
    setContentTitle(title);
    setContentText(text);
    setExercises([]); // Réinitialiser les exercices si du nouveau contenu est ajouté
    trackEvent('content_uploaded', { title, contentType: 'text/pdf' });
  };

  const handleGenerateExercises = async () => {
    if (!contentText) return;
    setIsLoading(true);
    try {
      const exerciseService = new ExerciseService();
      const newExercises = await exerciseService.generateExercises(contentText);
      setExercises(newExercises);
      trackEvent('exercises_generated', { count: newExercises.length });
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuizComplete = (score: number, totalQuestions: number) => {
    updateProgress(`quiz-${Date.now()}`, (score / totalQuestions) * 100, 120); // 120s simulées
    trackEvent('quiz_completed', { score, totalQuestions });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Bienvenue sur EduAdapt
        </Typography>
        <Typography variant="body1" gutterBottom>
          Transformez n'importe quel contenu en expériences d'apprentissage interactives.
        </Typography>

        <StatsDisplay progress={progress} totalExercisesCount={exercises.length} />
        <ProgressBar value={getCompletionRate(exercises.length)} label="Progression Générale" />
        
        <Box sx={{ my: 4 }}>
          {!contentText ? (
            <ContentUploader onContentProcessed={handleContentProcessed} />
          ) : (
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <TextViewer title={contentTitle} text={contentText} />
                <Button
                  variant="contained"
                  onClick={handleGenerateExercises}
                  disabled={isLoading}
                  sx={{ mt: 2 }}
                >
                  {isLoading ? 'Génération...' : 'Générer les exercices'}
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                {isLoading && <Loading message="Génération des exercices par IA..." />}
                {exercises.map((exercise) => {
                  if (exercise.type === 'quiz') {
                    return (
                      <Quiz
                        key={exercise.id}
                        questions={exercise.data as any[]}
                        onComplete={(score) => handleQuizComplete(score, (exercise.data as any[]).length)}
                      />
                    );
                  }
                  // Ajouter d'autres types d'exercices ici
                  return null;
                })}
              </Grid>
            </Grid>
          )}
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}