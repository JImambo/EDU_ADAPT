// src/hooks/useLocalStorage.ts
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}

// src/hooks/useProgress.ts
import { useState, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

export interface ProgressData {
  completedExercises: string[];
  scores: { [exerciseId: string]: number };
  totalTime: number;
  lastActivity: Date;
}

export const useProgress = () => {
  const [progress, setProgress] = useLocalStorage<ProgressData>('eduadapt-progress', {
    completedExercises: [],
    scores: {},
    totalTime: 0,
    lastActivity: new Date()
  });

  const updateProgress = useCallback((exerciseId: string, score: number, timeSpent: number) => {
    setProgress(currentProgress => ({
      ...currentProgress,
      completedExercises: [...currentProgress.completedExercises, exerciseId],
      scores: { ...currentProgress.scores, [exerciseId]: score },
      totalTime: currentProgress.totalTime + timeSpent,
      lastActivity: new Date()
    }));
  }, [setProgress]);

  const getCompletionRate = useCallback(() => {
    // Calcul basé sur le nombre total d'exercices disponibles
    const totalExercises = 10; // À remplacer par le nombre réel
    return (progress.completedExercises.length / totalExercises) * 100;
  }, [progress]);

  return { progress, updateProgress, getCompletionRate };
};