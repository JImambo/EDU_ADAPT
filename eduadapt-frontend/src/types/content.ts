export interface ContentItem {
    id: string;
    title: string;
    type: 'text' | 'pdf';
    text?: string; // Texte extrait pour le traitement
    fileUrl?: string;
    uploadedAt: Date;
  }