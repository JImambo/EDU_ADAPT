import React, { useState } from 'react';
import { Card, CardContent, Button, Typography, Box, Alert } from '@mui/material';
import { QuizQuestion } from '../../types/exercise';

interface QuizProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
}

export const Quiz: React.FC<QuizProps> = ({ questions, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleNext = () => {
    if (selectedAnswer) {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = selectedAnswer;
      setAnswers(newAnswers);

      if (selectedAnswer === questions[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResults(true);
        onComplete(score + (selectedAnswer === questions[currentQuestion].correctAnswer ? 1 : 0));
      }
    }
  };

  if (showResults) {
    return (
      <Alert severity="success">
        <Typography variant="h5">Quiz terminé !</Typography>
        <Typography variant="body1">Votre score est de {score} / {questions.length}</Typography>
      </Alert>
    );
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">
          Question {currentQuestion + 1} / {questions.length}
        </Typography>
        <Typography variant="body1" sx={{ my: 2 }}>
          {questions[currentQuestion].question}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {questions[currentQuestion].options.map((option) => (
            <Button
              key={option}
              variant={selectedAnswer === option ? "contained" : "outlined"}
              onClick={() => setSelectedAnswer(option)}
              sx={{ justifyContent: 'flex-start' }}
            >
              {option}
            </Button>
          ))}
        </Box>
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={!selectedAnswer}
          sx={{ mt: 2 }}
        >
          {currentQuestion < questions.length - 1 ? 'Suivant' : 'Terminer'}
        </Button>
      </CardContent>
    </Card>
  );
};