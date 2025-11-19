// src/components/exercises/Quiz.tsx
import React, { useState } from 'react';
import { QuizQuestion } from '../../types/exercise';

interface QuizProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
}

export const Quiz: React.FC<QuizProps> = ({ questions, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (answer: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answer;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };

  const calculateResults = () => {
    let score = 0;
    questions.forEach((question, index) => {
      if (question.correctAnswer === selectedAnswers[index]) {
        score++;
      }
    });
    setShowResults(true);
    onComplete(score);
  };

  if (showResults) {
    return (
      <div>
        <h2>Résultats du quiz</h2>
        <p>Vous avez obtenu {selectedAnswers.filter((answer, index) => 
          answer === questions[index].correctAnswer).length} / {questions.length} points</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Question {currentQuestion + 1} / {questions.length}</h2>
      <p>{questions[currentQuestion].question}</p>
      <div>
        {questions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(option)}
            style={{
              backgroundColor: selectedAnswers[currentQuestion] === option ? '#e0f7fa' : '#f5f5f5'
            }}
          >
            {option}
          </button>
        ))}
      </div>
      <button 
        onClick={handleNext} 
        disabled={!selectedAnswers[currentQuestion]}
      >
        {currentQuestion < questions.length - 1 ? 'Suivant' : 'Terminer'}
      </button>
    </div>
  );
};