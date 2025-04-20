import './WordDisplay.css';

const WordDisplay = ({ maskedWord }) => {
  return (
    <div className="word-display">
      {maskedWord.split(' ').map((char, index) => (
        <span key={index} className={`word-letter ${char !== '_' ? 'revealed' : ''}`}>
          {char}
        </span>
      ))}
    </div>
  );
};

export default WordDisplay;