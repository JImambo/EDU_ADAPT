import ollama from 'ollama';

const response = await ollama.generate({
  model: 'llama3.1',
  prompt: 'Explique moi la théorie de la relativité simplement.'
});

console.log(response.response);
