// src/components/exercises/__tests__/Quiz.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Quiz } from '../Quiz';

const mockQuestions = [
  {
    id: '1',
    question: 'Quelle est la capitale de la France?',
    options: ['Londres', 'Berlin', 'Paris', 'Madrid'],
    correctAnswer: 'Paris'
  },
  {
    id: '2',
    question: 'Combien font 2 + 2?',
    options: ['3', '4', '5', '22'],
    correctAnswer: '4'
  }
];

describe('Quiz Component', () => {
  it('renders the first question', () => {
    render(<Quiz questions={mockQuestions} onComplete={jest.fn()} />);
    expect(screen.getByText('Question 1 / 2')).toBeInTheDocument();
    expect(screen.getByText('Quelle est la capitale de la France?')).toBeInTheDocument();
  });

  it('allows selecting an answer and navigating to the next question', () => {
    const mockOnComplete = jest.fn();
    render(<Quiz questions={mockQuestions} onComplete={mockOnComplete} />);
    
    // Sélectionner une réponse
    fireEvent.click(screen.getByText('Paris'));
    
    // Passer à la question suivante
    fireEvent.click(screen.getByText('Suivant'));
    
    // Vérifier que nous sommes à la deuxième question
    expect(screen.getByText('Question 2 / 2')).toBeInTheDocument();
    expect(screen.getByText('Combien font 2 + 2?')).toBeInTheDocument();
  });

  it('calculates and shows results at the end', () => {
    const mockOnComplete = jest.fn();
    render(<Quiz questions={mockQuestions} onComplete={mockOnComplete} />);
    
    // Répondre à la première question
    fireEvent.click(screen.getByText('Paris'));
    fireEvent.click(screen.getByText('Suivant'));
    
    // Répondre à la deuxième question
    fireEvent.click(screen.getByText('4'));
    fireEvent.click(screen.getByText('Terminer'));
    
    // Vérifier que les résultats sont affichés
    expect(screen.getByText('Résultats du quiz')).toBeInTheDocument();
    expect(screen.getByText('Vous avez obtenu 2 / 2 points')).toBeInTheDocument();
    expect(mockOnComplete).toHaveBeenCalledWith(2);
  });
});