import api from './api';
import { Exercise, QuizQuestion, Flashcard } from '../types/exercise';

export class ExerciseService {
  async generateExercises(content: string): Promise<Exercise[]> {
    try {
      // Cet appel correspond à l'API route que nous avons créée précédemment
      const response = await api.post('/generate-quiz', { content });
      const quizData = response.data.quiz as QuizQuestion[];

      const quizExercise: Exercise = {
        id: `quiz-${Date.now()}`,
        type: 'quiz',
        contentId: `content-${Date.now()}`, // Devrait être lié au vrai contenu
        data: quizData,
      };

      // On peut simuler la génération d'autres types d'exercices
      const summaryExercise: Exercise = {
        id: `summary-${Date.now()}`,
        type: 'summary',
        contentId: `content-${Date.now()}`,
        data: `Voici un résumé du contenu : ${content.substring(0, 200)}...`,
      };
      
      return [quizExercise, summaryExercise]; // Retourne un tableau d'exercices
    } catch (error) {
      console.error("Erreur lors de la génération des exercices:", error);
      throw new Error("Impossible de générer les exercices.");
    }
  }
}