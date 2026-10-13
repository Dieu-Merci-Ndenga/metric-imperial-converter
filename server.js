require('dotenv').config();

const express = require('express');
const cors = require('cors');
const api = require('./routes/api');
const fccTesting = require('./routes/fcctesting');
const runner = require('./test-runner');

const app = express();

// 1. Activer le CORS pour freeCodeCamp
app.use(cors({ optionsSuccessStatus: 200 }));

// 2. Permettre à l'app de lire les données POST (JSON et formulaires)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Servir les fichiers statiques si besoin
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', (req, res) => {
  res.send('Metric-Imperial Converter');
});

// 4. Monter tes routes API
app.use('/api', api);

// 5. INDISPENSABLE : Routes de test pour freeCodeCamp
fccTesting(app);

// 6. Gestionnaire 404
app.use((req, res, next) => {
  res.status(404)
    .type('text')
    .send('Not Found');
});

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
    
    // Déclenchement automatique des tests si NODE_ENV=test
    if (process.env.NODE_ENV === 'test') {
      console.log('Running Tests...');
      setTimeout(() => {
        try {
          runner.run();
        } catch (e) {
          console.log('Tests are not valid:');
          console.log(e);
        }
      }, 1500);
    }
  });
}

module.exports = app;