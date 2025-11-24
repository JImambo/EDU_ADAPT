import { ContentItem } from '../types/content';
import { extractTextFromPDF, processTextContent } from '../utils/textProcessing';

export class ContentService {
  async processUploadedFile(file: File): Promise<{ title: string; text: string }> {
    const title = file.name.replace(/\.[^/.]+$/, ""); // Nom du fichier sans l'extension
    let text = '';

    if (file.type === 'application/pdf') {
      text = await extractTextFromPDF(file);
    } else if (file.type.startsWith('text/')) {
      text = await file.text();
    }

    return { title, text: processTextContent(text) };
  }

  // Simule la sauvegarde du contenu
  async saveContent(content: Omit<ContentItem, 'id' | 'uploadedAt'>): Promise<ContentItem> {
    // Dans une vraie app, ceci serait un appel POST à votre API
    const newItem: ContentItem = {
      ...content,
      id: `content-${Date.now()}`,
      uploadedAt: new Date(),
    };
    console.log('Contenu sauvegardé (simulé):', newItem);
    return newItem;
  }
}