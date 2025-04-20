const API_URL = 'http://localhost:3000/api';

export const createNewGame = async () => {
  try {
    const response = await fetch(`${API_URL}/game/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to create a new game');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating new game:', error);
    throw error;
  }
};

export const getGame = async (gameId) => {
  try {
    const response = await fetch(`${API_URL}/game/${gameId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch game');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching game:', error);
    throw error;
  }
};

export const makeGuess = async (gameId, letter) => {
  try {
    const response = await fetch(`${API_URL}/game/${gameId}/guess`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ letter }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to make a guess');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error making guess:', error);
    throw error;
  }
};