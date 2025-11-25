// Récupérer les éléments du DOM
const topicInput = document.getElementById('topic-input');
const generateBtn = document.getElementById('generate-btn');
const quizContainer = document.getElementById('quiz-container');
const PDF = document.getElementById('pdfInput');
const modeSelect = document.querySelector('select');

// AJOUTEZ VOTRE CLÉ API ICI
const API_KEY = process.env.OPENAI_API_KEY;

// ⭐ Fonction magique : extrait uniquement le JSON du texte ⭐
function extractJSON(text) {
    const jsonMatch = text.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
    if (jsonMatch) {
        return jsonMatch[0];
    }

    return text;
}

generateBtn.addEventListener('click', generateContent);

async function generateContent() {
    const topic = topicInput.value;
    const mode = modeSelect.value;
    
    if (!topic) {
        alert('Veuillez entrer un sujet !');
        return;
    }

    quizContainer.innerHTML = 'Génération en cours...';

    let prompt = '';

    if (mode === 'resumer') {
        prompt = `Fais un résumé clair du sujet : "${topic}". Répond UNIQUEMENT avec un JSON: {"titre": "...", "contenu": "...", "points_cles": [...]}`;
    }
    else if (mode === 'quiz') {
        prompt = `Génère un quiz de 10 questions sur : "${topic}". Répond UNIQUEMENT avec un JSON: {"quiz":[...]} `;
    }
    else if (mode === 'flashcards') {
        prompt = `Génère 10 flashcards sur : "${topic}". Répond UNIQUEMENT avec un JSON: {"flashcards":[...]}`;
    }

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [{ role: "user", content: prompt }],
                temperature: 0.3
            })
        });

        if (!response.ok) {
            throw new Error("Erreur HTTP " + response.status);
        }

        const data = await response.json();
        let content = data.choices[0].message.content;

        // ✨ SANITIZE : extraire seulement le JSON ✨
        const cleanJSON = extractJSON(content);
        const result = JSON.parse(cleanJSON);

        // Affichage selon mode
        if (mode === 'resumer') displayResume(result);
        else if (mode === 'quiz') displayQuiz(result.quiz);
        else if (mode === 'flashcards') displayFlashcards(result.flashcards);

    } catch (error) {
        console.error("Erreur:", error);
        quizContainer.innerHTML = "Une erreur est survenue. Réessaye.";
    }
}
