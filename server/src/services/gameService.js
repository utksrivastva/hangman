const { v4: uuidv4 } = require('uuid');
const wordService = require('./wordService');
const gameStore = require('../models/gameStore');

exports.createNewGame = async () => {
  try {
    const word = await wordService.getRandomWord();

    const maskedWord = word.replace(/[a-z]/gi, '_').split('').join(' ');

    const game = {
      id: uuidv4(),
      word,
      maskedWord,
      guessedLetters: [],
      remainingAttempts: 6,
      gameStatus: 'playing',
      createdAt: new Date()
    };

    await gameStore.saveGame(game);

    const { word: actualWord, ...gameWithoutWord } = game;
    return gameWithoutWord;
  } catch (error) {
    console.error('Error creating new game:', error);
    throw error;
  }
};

exports.getGame = async (id) => {
  try {
    const game = await gameStore.getGame(id);

    if (!game) {
      return null;
    }

    if (game.gameStatus === 'playing') {
      const { word, ...gameWithoutWord } = game;
      return gameWithoutWord;
    }

    return game;
  } catch (error) {
    console.error('Error getting game:', error);
    throw error;
  }
};

exports.makeGuess = async (id, letter) => {
  try {
    const game = await gameStore.getGame(id);

    if (!game) {
      throw new Error('Game not found');
    }

    if (game.gameStatus !== 'playing') {
      throw new Error('Game is already over');
    }

    if (game.guessedLetters.includes(letter)) {
      const { word, ...gameWithoutWord } = game;
      return gameWithoutWord;
    }

    const updatedGame = {
      ...game,
      guessedLetters: [...game.guessedLetters, letter]
    };

    if (game.word.includes(letter)) {

      let newMaskedWord = '';
      for (let i = 0; i < game.word.length; i++) {
        if (game.word[i] === letter) {
          newMaskedWord += letter + ' ';
        } else {
          newMaskedWord += game.maskedWord.charAt(i * 2) + ' ';
        }
      }
      updatedGame.maskedWord = newMaskedWord.trim();

      if (!updatedGame.maskedWord.includes('_')) {
        updatedGame.gameStatus = 'won';
      }
    } else {
      updatedGame.remainingAttempts -= 1;

      if (updatedGame.remainingAttempts === 0) {
        updatedGame.gameStatus = 'lost';
        updatedGame.maskedWord = game.word.split('').join(' ');
      }
    }

    await gameStore.saveGame(updatedGame);

    if (updatedGame.gameStatus === 'playing') {
      const { word, ...gameWithoutWord } = updatedGame;
      return gameWithoutWord;
    }
    return updatedGame;
  } catch (error) {
    console.error('Error making guess:', error);
    throw error;
  }
};