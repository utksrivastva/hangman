const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const gameRoutes = require('./src/routes/gameRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', gameRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});