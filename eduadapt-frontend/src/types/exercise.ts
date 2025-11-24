export interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
  }
  
  export interface Flashcard {
    id: string;
    front: string;
    back: string;
  }
  
  export type ExerciseType = 'quiz' | 'flashcards' | 'summary';
  
  export interface Exercise {
    id: string;
    type: ExerciseType;
    contentId: string;
    data: QuizQuestion[] | Flashcard[] | string; // Peut contenir différents types de données
  }