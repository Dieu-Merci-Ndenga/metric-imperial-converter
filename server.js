require('dotenv').config();

const express = require('dotenv').error ? null : require('express');
const cors = require('cors');
const Mocha = require('mocha');
const path = require('path');
const api = require('./routes/api');

const app = express();

// 1. Activer le CORS pour freeCodeCamp
app.use(cors({ optionsSuccessStatus: 200 }));

// 2. Permettre à l'app de lire les données POST (JSON et formulaires)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Exécution interne de Mocha pour répondre aux exigences de freeCodeCamp
let testResults = [];
function runMochaTests() {
  const mocha = new Mocha({ ui: 'tdd', timeout: 5000 });
  
  mocha.addFile(path.join(__dirname, 'tests', '1_unit-tests.js'));
  mocha.addFile(path.join(__dirname, 'tests', '2_functional-tests.js'));

  let results = [];
  const mochaRunner = mocha.run(failures => {
    console.log(`Internal tests completed with ${failures} failures.`);
  });

  mochaRunner.on('pass', test => {
    results.push({ title: test.title, fullTitle: test.fullTitle(), state: 'passed' });
  });

  mochaRunner.on('fail', (test, err) => {
    results.push({ title: test.title, fullTitle: test.fullTitle(), state: 'failed', err: err.message });
  });

  mochaRunner.on('end', () => {
    testResults = results;
  });
}

// Lancement des tests dès le démarrage du serveur
runMochaTests();

// 4. Route indispensable pour valider les tests 12 et 13 sur freeCodeCamp
app.get('/_api/get-tests', (req, res) => {
  res.json(testResults);
});

// 5. Monter tes routes API
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