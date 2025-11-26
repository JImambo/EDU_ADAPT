'use client';

import { useState } from 'react';
import { Container, Typography, Box, Button, Paper } from '@mui/material';
import { EmojiEvents, TrendingUp, Schedule } from '@mui/icons-material';

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
import { StudentDashboard } from '../components/dashboard/StudentDashboard';

export default function Home() {
  const [contentTitle, setContentTitle] = useState<string>('');
  const [contentText, setContentText] = useState<string>('');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { progress, updateProgress, getCompletionRate } = useProgress();

  const studentStats = [
    { icon: EmojiEvents, title: 'Badges gagnés', value: '12' },
    { icon: TrendingUp, title: 'Progression hebdomadaire', value: '+15%' },
    { icon: Schedule, title: 'Temps d\'étude', value: '4h 23min' },
  ];

  const handleContentProcessed = (title: string, text: string) => {
    setContentTitle(title);
    setContentText(text);
    setExercises([]);
    trackEvent('content_uploaded', { title, contentType: 'text/pdf' });
  };

  const handleGenerateExercises = async () => {
    if (!contentText) return;
    setIsLoading(true);
    try {
      // --- CORRECTION 1 : Données mockées qui correspondent AU TYPE 'Exercise' ---
      const mockExercises: Exercise[] = [
        {
          id: 'quiz-mock-1', // L'ID est requis
          type: 'quiz',
          data: [ // La propriété 'data' doit contenir un tableau de 'QuizQuestion'
              {
                id: 'q1', // L'ID est requis pour chaque question
                question: "Quelle est la capitale de la France ?",
                options: ["Lyon", "Marseille", "Paris", "Toulouse"],
                correctAnswer: "Paris"
              },
              {
                id: 'q2',
                question: "Quel est le plus grand océan du monde ?",
                options: ["Atlantique", "Indien", "Arctique", "Pacifique"],
                correctAnswer: "Pacifique"
              }
          ] as QuizQuestion[] // Assertion de type pour aider TypeScript
        }
      ];
  
      setExercises(mockExercises);
      trackEvent('exercises_generated', { count: mockExercises.length });
    } catch (error) {
      alert("Une erreur est survenue lors de la génération.");
    } finally {
      setIsLoading(false);
    }
  };
  /* const handleGenerateExercises = async () => {
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
  }; */

  const handleQuizComplete = (score: number, totalQuestions: number) => {
    updateProgress(`quiz-${Date.now()}`, (score / totalQuestions) * 100, 120);
    trackEvent('quiz_completed', { score, totalQuestions });
  };

  return (
    // === DEBUT DU CONTENEUR PRINCIPAL ===
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      
      <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
        <Container>
          {/* Section d'accueil stylisée */}
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
              Bienvenue sur EduAdapt
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              Transformez n'importe quel contenu en expériences d'apprentissage interactives et personnalisées.
            </Typography>
          </Box>

          {/* Dashboard */}
          <Box sx={{ mb: 6 }}>
            <StudentDashboard stats={studentStats} />
          </Box>

          {/* Section de progression et contenu */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
            <Box sx={{ flexGrow: 1, flexBasis: { xs: '100%', md: '66.666%' } }}>
              <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }}>
                <Typography variant="h6" gutterBottom>Activité d'Apprentissage</Typography>
                <StatsDisplay progress={progress} totalExercisesCount={exercises.length} />
                <ProgressBar value={getCompletionRate(exercises.length)} label="Progression Générale" />
              </Paper>
            </Box>
            <Box sx={{ flexGrow: 1, flexBasis: { xs: '100%', md: '33.333%' } }}>
              <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }}>
                 <Typography variant="h6" gutterBottom>Résumé</Typography>
                 <Typography variant="body2" color="text.secondary">
                    Continuez à travailler sur vos exercices pour améliorer votre progression.
                 </Typography>
              </Paper>
            </Box>
          </Box>
          <Box
              sx={{
                backgroundColor: 'primary.main', // Devrait être bleu foncé
                color: 'primary.contrastText', // Devrait être blanc
                p: 2,
                border: 2,
                borderColor: 'secondary.main', // Devrait être teal
                my: 2,
              }}
            >
              Si tu vois ce fond bleu et cette bordure teal, le thème fonctionne !
          </Box>

          <Box sx={{ mt: 4 }}>
            {!contentText ? (
              <ContentUploader onContentProcessed={handleContentProcessed} />
            ) : (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                <Box sx={{ flexGrow: 1, flexBasis: { xs: '100%', md: '50%' } }}>
                  <Paper sx={{ p: 3, borderRadius: 3 }}>
                    <TextViewer title={contentTitle} text={contentText} />
                    <Button
                      variant="contained"
                      onClick={handleGenerateExercises}
                      disabled={isLoading}
                      fullWidth
                      sx={{ mt: 3 }}
                    >
                      {isLoading ? 'Génération...' : 'Générer les exercices'}
                    </Button>
                  </Paper>
                </Box>
                <Box sx={{ flexGrow: 1, flexBasis: { xs: '100%', md: '50%' } }}>
                  {isLoading && <Loading message="Génération des exercices par IA..." />}
                  {exercises.map((exercise) => {
                    if (exercise.type === 'quiz') {
                      return (
                        <Quiz
                          key={exercise.id} // Utilisez l'ID de l'exercice
                          questions={exercise.data as QuizQuestion[]} // Passez 'exercise.data' qui est le tableau de questions
                          onComplete={(score) => handleQuizComplete(score, (exercise.data as QuizQuestion[]).length)}
                        />
                      );
                    }
                    // Ajoutez d'autres types d'exercices ici
                    return null;
                  })}
                </Box>
              </Box>
            )}
          </Box>
        </Container> {/* === FIN DU CONTAINER === */}
      </Box>
      
      <Footer />
    </Box> // === FIN DU CONTENEUR PRINCIPAL ===
  );
}