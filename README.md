# EduAdapt - Plateforme d'apprentissage personnalisée ![Statut du projet](https://img.shields.io/badge/status-en%20développement-orange)

## Description courte

EduAdapt est une plateforme innovante d’apprentissage personnalisée, inspirée de Microsoft AI Classroom et des initiatives d’éducation numérique européennes. Elle vise à révolutionner la façon dont les étudiants interagissent avec le contenu pédagogique grâce à l’Intelligence Artificielle.

---

## Table des Matières

- [Problématique](#problématique)
- [Stack Technique](#stack-technique)
- [Fonctionnalités](#fonctionnalités)
- [Impact Attendu](#impact-attendu)
- [Livrables UML](#livrables-uml)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

---

## Problématique

L’application EduAdapt transforme tout contenu éducatif statique (cours, documents, vidéos) en expériences interactives adaptées au niveau de chaque étudiant. 
Elle génère automatiquement :
- Quiz personnalisés
- Flashcards intelligentes
- Résumés progressifs

Chaque expérience est ajustée selon le profil et l’évolution de l’élève, rendant l’apprentissage plus efficace et motivant.

---

## Stack Technique

- **React** : Interface utilisateur dynamique et responsive
- **Composants réutilisables** pour modularité et maintenabilité
- **Intégration d’API IA (Ollama)** : génération de contenus adaptatifs (quiz, flashcards, résumés)
- **Stockage local** des progrès étudiants
- **Analytics** pour suivi de l’engagement et de la progression
- **Gamification** : badges, scores, challenges
- **Algorithmes adaptatifs** : recommandation automatisée de parcours et de contenus

---

## Fonctionnalités (Niveau Basique)

- Conversion de contenu éducatif en quiz, flashcards et résumés interactifs
- Création de profils étudiants
- Suivi de la progression
- Gamification simple (badges, scores)
- Export des résultats
- Visualisation d’analytics de base

---

## Impact Attendu

- **Amélioration de 40% de la rétention d’information** chez les étudiants utilisant la plateforme
- Personnalisation poussée de l’apprentissage
- Gain de temps pour enseignants et élèves dans la préparation/revision

---

## Livrables UML

Diagrammes inclus dans le dossier `/uml` :
- Diagramme de cas d’utilisation
- Diagramme de classes
- Diagramme d’activités

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

- Importez un contenu éducatif (texte, vidéo ou PDF)
- Sélectionnez le niveau de difficulté souhaité
- Commencez l’expérience interactive !
- Suivez vos progrès dans l’espace analytics

---

## Contributing

Les contributions sont les bienvenues !
- Forkez le projet
- Créez une branche (`feature/ma-feature`)
- Soumettez une Pull Request

Merci de consulter le fichier `CONTRIBUTING.md` pour le guide complet.

---

_Copyright © 2025 JImambo & Contributeurs EDU_ADAPT_
