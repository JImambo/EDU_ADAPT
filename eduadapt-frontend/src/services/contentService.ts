// src/services/contentService.ts
import { extractTextFromPDF, processTextContent } from '../utils/textProcessing';

export class ContentService {
  async processUploadedFile(file: File): Promise<string> {
    if (file.type === 'application/pdf') {
      return await extractTextFromPDF(file);
    } else if (file.type.startsWith('text/')) {
      return await file.text();
    }
    throw new Error('Type de fichier non supporté');
  }

  async generateExercises(content: string): Promise<Exercise[]> {
    // Appel à l'API OpenAI ou Gemini pour générer des exercices
    const response = await fetch('/api/generate-exercises', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content })
    });
    
    return response.json();

}