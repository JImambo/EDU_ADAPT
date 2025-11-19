// src/services/courseGenerationService.ts
export class CourseGenerationService {
    async generateCourseFromTopic(topic: string, userLevel: number): Promise<Course> {
      // Génère un cours complet sur un sujet spécifique
      const outline = await this.generateCourseOutline(topic, userLevel);
      const modules = await Promise.all(
        outline.modules.map(module => this.generateModule(module, userLevel))
      );
      
      return {
        id: generateId(),
        title: outline.title,
        description: outline.description,
        modules,
        estimatedDuration: modules.reduce((sum, module) => sum + module.estimatedDuration, 0),
        difficulty: userLevel,
        createdAt: new Date()
      };
    }
  
    private async generateCourseOutline(topic: string, userLevel: number): Promise<CourseOutline> {
      // Utilise l'IA pour générer un plan de cours
      const prompt = `
        Crée un plan de cours détaillé sur le sujet "${topic}" pour un étudiant de niveau ${userLevel}/3.
        
        Le plan doit inclure:
        1. Un titre accrocheur pour le cours
        2. Une brève description
        3. 4-6 modules avec des titres et des descriptions
        
        Format de réponse JSON:
        {
          "title": "...",
          "description": "...",
          "modules": [
            {
              "title": "...",
              "description": "...",
              "estimatedDuration": 30
            },
            ...
          ]
        }
      `;
  
      const response = await fetch('/api/generate-course-outline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      
      return response.json();
    }
  
    private async generateModule(moduleOutline: ModuleOutline, userLevel: number): Promise<CourseModule> {
      // Génère le contenu détaillé pour un module
      const content = await this.generateModuleContent(moduleOutline.title, userLevel);
      const exercises = await this.generateModuleExercises(moduleOutline.title, userLevel);
      
      return {
        id: generateId(),
        title: moduleOutline.title,
        description: moduleOutline.description,
        content,
        exercises,
        estimatedDuration: moduleOutline.estimatedDuration
      };
    }
  
    private async generateModuleContent(moduleTitle: string, userLevel: number): Promise<ModuleContent> {
      // Génère le contenu textuel, les images et les vidéos pour un module
      const prompt = `
        Génère du contenu éducatif détaillé pour un module intitulé "${moduleTitle}" 
        adapté à un étudiant de niveau ${userLevel}/3.
        
        Le contenu doit inclure:
        1. Une introduction
        2. 3-5 sections avec des explications claires
        3. Des exemples pratiques
        4. Un résumé
        
        Format de réponse JSON:
        {
          "introduction": "...",
          "sections": [
            {
              "title": "...",
              "content": "...",
              "examples": ["...", "..."]
            },
            ...
          ],
          "summary": "..."
        }
      `;
  
      const response = await fetch('/api/generate-module-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      
      return response.json();
    }
  
    private async generateModuleExercises(moduleTitle: string, userLevel: number): Promise<Exercise[]> {
      // Génère des exercices adaptés pour un module
      const prompt = `
        Crée 5 exercices variés pour un module intitulé "${moduleTitle}" 
        adapté à un étudiant de niveau ${userLevel}/3.
        
        Les exercices doivent inclure un mélange de:
        1. Questions à choix multiples
        2. Vrai ou faux
        3. Questions à réponse courte
        4. Exercices pratiques
        
        Format de réponse JSON:
        {
          "exercises": [
            {
              "type": "multiple_choice",
              "question": "...",
              "options": ["...", "...", "..."],
              "correctAnswer": "...",
              "explanation": "..."
            },
            ...
          ]
        }
      `;
  
      const response = await fetch('/api/generate-module-exercises', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      
      const result = await response.json();
      return result.exercises;
    }
  }