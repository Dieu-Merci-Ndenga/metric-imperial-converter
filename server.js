require('dotenv').config();

const express = require('express');
const cors = require('cors'); // INDISPENSABLE
const api = require('./routes/api');

const app = express();

// 1. Activer le CORS pour freeCodeCamp
app.use(cors({ optionsSuccessStatus: 200 }));

// 2. Permettre à l'app de lire les données POST (JSON et formulaires)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Monter tes routes
app.use('/api', api);

app.get('/', (req, res) => {
  res.send('Metric-Imperial Converter');
});

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}

module.exports = app;