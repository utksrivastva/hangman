# Hangman Game

A full-stack implementation of the classic Hangman word guessing game.

## Features

- React frontend with interactive game UI
- Node.js/Express backend
- Game state persistence across browser restarts
- Random word generation
- Support for multiple simultaneous players

## Project Structure

- `/client` - React frontend application
- `/server` - Node.js/Express backend

## Setup Instructions

### Prerequisites
- Node.js (v18.20.4 or higher)
- npm or yarn

### Backend Setup
```bash
cd server
npm install
npm run dev
```

The server will run on http://localhost:3000

### Frontend Setup
```bash
cd client
npm install
npm run dev
```

The application will open in your browser at http://localhost:5173

## Game Rules

1. A random word is selected at the start of the game
2. Player tries to guess the word by selecting one letter at a time
3. If the letter is in the word, it's revealed
4. If the letter is not in the word, part of the hangman is drawn
5. The game ends when either the word is guessed correctly or the hangman is completed (6 incorrect guesses)

## Technologies Used

- Frontend: React.js
- Backend: Node.js, Express
- State Management: React Hooks
- Persistence: File-based storage with in-memory cache
- External API: Random word generation

## License

[MIT](LICENSE)