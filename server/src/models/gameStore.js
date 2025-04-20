const fs = require('fs');
const path = require('path');

class GameStore {
  constructor() {
    this.games = {};
    this.filePath = path.join(__dirname, '../../data/games.json');
   
    const dataDir = path.join(__dirname, '../../data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    this.loadGames();
    
    setInterval(() => this.saveGamesToFile(), 60000);
  }

  loadGames() {
    try {
      if (fs.existsSync(this.filePath)) {
        const data = fs.readFileSync(this.filePath, 'utf8');
        this.games = JSON.parse(data);
      
        this.cleanupOldGames();
      }
    } catch (error) {
      console.error('Error loading games from file:', error);
      this.games = {};
    }
  }

  saveGamesToFile() {
    try {
      this.cleanupOldGames();
      
      fs.writeFileSync(this.filePath, JSON.stringify(this.games, null, 2), 'utf8');
    } catch (error) {
      console.error('Error saving games to file:', error);
    }
  }

  cleanupOldGames() {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    
    for (const gameId in this.games) {
      const game = this.games[gameId];
      const gameDate = new Date(game.createdAt);
      
      if (gameDate < oneDayAgo) {
        delete this.games[gameId];
      }
    }
  }

  async getGame(id) {
    return this.games[id] || null;
  }

  async saveGame(game) {
    this.games[game.id] = game;

    if (Object.keys(this.games).length % 10 === 0) {
      this.saveGamesToFile();
    }

    return game;
  }
}

const gameStore = new GameStore();
module.exports = gameStore;