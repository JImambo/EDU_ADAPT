# EduAdapt - Plateforme d'apprentissage personnalisée ![Statut du projet](https://img.shields.io/badge/status-en%20développement-orange)

## Description courte

EduAdapt est une plateforme innovante d’apprentissage personnalisée, inspirée de Microsoft AI Classroom et des initiatives européennes. Elle exploite l’IA pour transformer rapidement tout contenu pédagogique en expériences interactives et adaptatives.

---

## Table des Matières

- [Problématique](#problématique)
- [Stack Technique](#stack-technique)
- [Architecture](#architecture)
- [Fonctionnalités](#fonctionnalités-niveau-basique)
- [Impact Attendu](#impact-attendu)
- [Livrables UML](#livrables-uml)
- [API & Composants](#api--composants)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Licence](#licence)

---

## Problématique

EduAdapt transforme le contenu éducatif (documents, PDF, vidéos) en expériences interactives adaptées au niveau et au profil de chaque étudiant, avec génération automatique de quiz, flashcards et résumés. Objectif : personnaliser et dynamiser l’apprentissage pour maximiser la rétention.

---

## Stack Technique

- **Front-end**: React (TypeScript)
  - Utilisation de hooks, context et composants réutilisables
- **Back-end / IA** : Intégration d’API Ollama (génération, adaptation des contenus)
- **Stockage local**: `localStorage`, `IndexedDB`
- **Analytics** : suivi des interactions via Google Analytics ou outil personnalisé
- **Gamification** : gestion de badges et niveaux (état stocké côté client)
- **Algorithmes adaptatifs** : adaptation dynamique du contenu via scoring et tracking de performance

**Langages principaux** :
- TypeScript (50%)
- HTML (28%)
- CSS (21%)
- JavaScript (1%)

---

## Architecture

### Schéma simplifié

```
[UI React]
     |
[Composants d’interface] --- [Composant Quiz] / [Composant Flashcard] / [Composant Résumé]
     |
[Intégration API Ollama] <---> [Serveur IA pour génération de contenu adaptatif]
     |
[Stockage local] <--- [Progression, résultats, analytics]
```

---

## Fonctionnalités (Niveau Basique)

- **Import** de contenu éducatif (PDF, texte, vidéo)
- **Génération** automatique de :
  - Quiz (QCM, vrai/faux, réponses courtes)
  - Flashcards personnalisées
  - Résumés intelligents
- **Profil étudiant** : création et suivi, sauvegarde locale
- **Analytics de base** : visualisation des progrès et des scores
- **Gamification** : badges, scores, historique de challenges

---

## Impact Attendu

- Amélioration estimée de **40% de la rétention d’information**
- Personnalisation avancée et engagement accru
- Automatisation du processus de création de supports d’apprentissage

---

## Livrables UML

Diagrammes disponibles dans le dossier `/uml` :
- **Cas d’utilisation** : description des parcours utilisateur (enseignant, étudiant)
- **Classes** : structure des composants principaux (Quiz, Flashcard, Résumé, API)
- **Activités** : séquences des principales interactions (import, génération, scoring)

---

## API & Composants

### Principaux composants

- **QuizGenerator**: génère des quiz via Ollama, adapte le niveau
- **FlashcardGenerator**: crée des flashcards interactives
- **SummaryGenerator**: synthétise le contenu source
- **StudentProfile**: gestion du profil et progression
- **GamificationEngine**: attribution de badges, gestion des scores

### Exemple d’intégration API (Ollama)

```typescript
const response = await fetch('/api/ollama/generate', {
  method: 'POST',
  body: JSON.stringify({ content: myLesson, type: "quiz" }),
  headers: { 'Content-Type': 'application/json' }
});
const quizData = await response.json();
```

---

## Installation

```bash
git clone https://github.com/JImambo/EDU_ADAPT.git
cd EDU_ADAPT
npm install
npm start
```
_Nécessite Node.js et npm._

---

## Usage

1. Démarrez l’application (`npm start`)
2. Importez un contenu éducatif (texte, PDF, vidéo)
3. Sélectionnez le niveau de difficulté
4. Pratiquez avec les quiz, flashcards ou résumés générés
5. Consultez vos scores, badges et progrès dans l’onglet Analytics

---

## Contributing

- Forkez le projet
- Créez une branche (`feature/ma-feature`)
- Soumettez une Pull Request
- Reportez-vous au fichier `CONTRIBUTING.md` pour plus de détails

---

## Licence

Ce projet est ouvert sous licence MIT.

---

_Copyright © 2025 JImambo & Contributeurs EDU_ADAPT_
