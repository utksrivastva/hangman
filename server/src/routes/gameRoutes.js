const express = require('express');
const gameController = require('../controllers/gameController');

const router = express.Router();

router.post('/game/new', gameController.createNewGame);

router.get('/game/:id', gameController.getGame);

router.post('/game/:id/guess', gameController.makeGuess);

module.exports = router;