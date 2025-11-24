import { useState, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

export interface ProgressData {
  completedExercises: string[];
  scores: { [exerciseId: string]: number };
  totalTime: number; // en secondes
  lastActivity: Date;
}

export const useProgress = () => {
  const [progress, setProgress] = useLocalStorage<ProgressData>('eduadapt-progress', {
    completedExercises: [],
    scores: {},
    totalTime: 0,
    lastActivity: new Date(),
  });

  const updateProgress = useCallback((exerciseId: string, score: number, timeSpent: number) => {
    setProgress((currentProgress) => ({
      ...currentProgress,
      completedExercises: [...new Set([...currentProgress.completedExercises, exerciseId])],
      scores: { ...currentProgress.scores, [exerciseId]: score },
      totalTime: currentProgress.totalTime + timeSpent,
      lastActivity: new Date(),
    }));
  }, [setProgress]);

  const getCompletionRate = useCallback((totalExercises: number) => {
    if (totalExercises === 0) return 0;
    return (progress.completedExercises.length / totalExercises) * 100;
  }, [progress.completedExercises.length]);

  return { progress, updateProgress, getCompletionRate };
};