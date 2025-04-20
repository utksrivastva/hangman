const gameService = require('../services/gameService');

exports.createNewGame = async (req, res, next) => {
  try {
    const game = await gameService.createNewGame();
    res.status(201).json(game);
  } catch (error) {
    next(error);
  }
};

exports.getGame = async (req, res, next) => {
  try {
    const { id } = req.params;
    const game = await gameService.getGame(id);
    
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }
    
    res.status(200).json(game);
  } catch (error) {
    next(error);
  }
};

exports.makeGuess = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { letter } = req.body;
    
    if (!letter || typeof letter !== 'string' || letter.length !== 1) {
      return res.status(400).json({ error: 'Invalid letter' });
    }
    
    const game = await gameService.getGame(id);
    
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }
    
    if (game.gameStatus !== 'playing') {
      return res.status(400).json({ error: 'Game is already over' });
    }
    
    const updatedGame = await gameService.makeGuess(id, letter.toLowerCase());
    res.status(200).json(updatedGame);
  } catch (error) {
    next(error);
  }
};