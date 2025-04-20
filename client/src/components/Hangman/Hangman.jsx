import { useState, useEffect } from 'react';
import WordDisplay from '../WordDisplay/WordDisplay';
import HangmanFigure from '../HangmanFigure/HangmanFigure';
import Keyboard from '../Keyboard/Keyboard';
import { createNewGame, getGame, makeGuess } from '../../services/gameService';
import './Hangman.css';

const Hangman = () => {
  const [gameState, setGameState] = useState({
    maskedWord: '',
    guessedLetters: [],
    remainingAttempts: 6,
    gameStatus: 'playing',
    id: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleGuess = async (letter) => {
    if (
      gameState.gameStatus !== 'playing' ||
      gameState.guessedLetters.includes(letter)
    ) {
      return;
    }
    
    try {
      setLoading(true);
      const updatedGame = await makeGuess(gameState.id, letter);
      setGameState(updatedGame);
      setLoading(false);
    } catch (error) {
      console.error('Error making guess:', error);
      setError('Failed to submit your guess. Please try again.');
      setLoading(false);
    }
  };

  const startNewGame = async () => {
    try {
      setLoading(true);
      setError(null);
      const newGame = await createNewGame();
      setGameState(newGame);
      
      localStorage.setItem('hangman_game_id', newGame.id);
      
      setLoading(false);
    } catch (error) {
      console.error('Error starting new game:', error);
      setError('Failed to start a new game. Please try again.');
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadGame = async () => {
      try {
        setLoading(true);
        
        const savedGameId = localStorage.getItem('hangman_game_id');
        
        if (savedGameId) {
          try {
            const savedGame = await getGame(savedGameId);
            setGameState(savedGame);
          } catch (error) {
            console.error('Error loading saved game:', error);
            const newGame = await createNewGame();
            setGameState(newGame);
            localStorage.setItem('hangman_game_id', newGame.id);
          }
        } else {
          const newGame = await createNewGame();
          setGameState(newGame);
          localStorage.setItem('hangman_game_id', newGame.id);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error loading game:', error);
        setError('Failed to load the game. Please try again.');
        setLoading(false);
      }
    };
    
    loadGame();
  }, []);

  if (loading) {
    return <div className="loading">Loading game...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
        <button onClick={startNewGame}>Try again</button>
      </div>
    );
  }

  return (
    <div className="hangman-container">
      <div className="game-status">
        {gameState.gameStatus === 'won' && (
          <div className="win-message">Congratulations! You won!</div>
        )}
        {gameState.gameStatus === 'lost' && (
          <div className="lose-message">
            Game Over! The word was: {gameState.word}
          </div>
        )}
      </div>

      <HangmanFigure incorrectGuesses={6 - gameState.remainingAttempts} />
      
      <WordDisplay maskedWord={gameState.maskedWord} />
      
      <div className="game-info">
        <p>Attempts remaining: {gameState.remainingAttempts}</p>
        <p>
          Letters guessed: {gameState.guessedLetters.length > 0 
            ? gameState.guessedLetters.join(', ') 
            : 'None'}
        </p>
      </div>

      <Keyboard 
        guessedLetters={gameState.guessedLetters}
        onGuess={handleGuess}
        gameStatus={gameState.gameStatus}
      />

      <div className="game-controls">
        <button 
          onClick={startNewGame}
          className="new-game-button"
        >
          New Game
        </button>
      </div>
    </div>
  );
};

export default Hangman;