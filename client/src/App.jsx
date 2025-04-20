import Hangman from './components/Hangman/Hangman';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hangman Game</h1>
      </header>
      <main>
        <Hangman />
      </main>
      <footer>
        <p>Developed by <a href='https://www.linkedin.com/in/utksrivastva/' target='_blank'>Utkarsh Srivastava</a></p>
      </footer>
    </div>
  );
}

export default App;