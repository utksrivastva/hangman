const axios = require('axios');

const fallbackWords = [
  'javascript', 'react', 'node', 'express',
  'frontend', 'backend', 'fullstack', 'developer',
  'programming', 'coding', 'algorithm', 'database',
  'server', 'client', 'api', 'component', 'responsive',
  'application', 'interface', 'framework'
];

exports.getRandomWord = async () => {
  try {
    const apiUrl = process.env.RANDOM_WORD_API_URL;
    const response = await axios.get(apiUrl);
  
    const word = response.data[0];
    
    if (word && typeof word === 'string' && word.length >= 4 && word.length <= 10) {
      return word.toLowerCase();
    }
    return getFallbackWord();
  } catch (error) {
    console.error('Error fetching random word:', error);
    return getFallbackWord();
  }
};

function getFallbackWord() {
  const randomIndex = Math.floor(Math.random() * fallbackWords.length);
  return fallbackWords[randomIndex];
}