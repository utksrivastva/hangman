import './Keyboard.css';

const Keyboard = ({ guessedLetters, onGuess, gameStatus }) => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  
  return (
    <div className="keyboard">
      {alphabet.map(letter => (
        <button
          key={letter}
          className={`keyboard-button ${guessedLetters.includes(letter) ? 'guessed' : ''}`}
          onClick={() => onGuess(letter)}
          disabled={guessedLetters.includes(letter) || gameStatus !== 'playing'}
        >
          {letter}
        </button>
      ))}
    </div>
  );
};

export default Keyboard;