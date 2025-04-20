import './HangmanFigure.css';

const HangmanFigure = ({ incorrectGuesses }) => {
  return (
    <div className="hangman-figure">
      <svg height="250" width="200" className="hangman-svg">
        {/* Base */}
        <line x1="20" y1="230" x2="100" y2="230" className="figure-part" />
        
        {/* Vertical pole */}
        <line x1="60" y1="230" x2="60" y2="20" className="figure-part" />
        
        {/* Horizontal beam */}
        <line x1="60" y1="20" x2="140" y2="20" className="figure-part" />
        
        {/* Rope */}
        <line x1="140" y1="20" x2="140" y2="50" className="figure-part" />
        
        {/* Head */}
        {incorrectGuesses >= 1 && (
          <circle cx="140" cy="70" r="20" className="figure-part" />
        )}
        
        {/* Body */}
        {incorrectGuesses >= 2 && (
          <line x1="140" y1="90" x2="140" y2="150" className="figure-part" />
        )}
        
        {/* Left Arm */}
        {incorrectGuesses >= 3 && (
          <line x1="140" y1="120" x2="120" y2="100" className="figure-part" />
        )}
        
        {/* Right Arm */}
        {incorrectGuesses >= 4 && (
          <line x1="140" y1="120" x2="160" y2="100" className="figure-part" />
        )}
        
        {/* Left Leg */}
        {incorrectGuesses >= 5 && (
          <line x1="140" y1="150" x2="120" y2="180" className="figure-part" />
        )}
        
        {/* Right Leg */}
        {incorrectGuesses >= 6 && (
          <line x1="140" y1="150" x2="160" y2="180" className="figure-part" />
        )}
      </svg>
    </div>
  );
};

export default HangmanFigure;