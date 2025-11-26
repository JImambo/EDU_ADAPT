/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    // Ajoutez ici toutes vos autres variables d'environnement préfixées par VITE_
    // readonly VITE_AUTRE_VARIABLE: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }