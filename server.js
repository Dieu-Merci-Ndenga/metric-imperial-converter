require('dotenv').config();

const express = require('express');
const api = require('./routes/api');

const app = express();

app.use('/api', api);
app.get('/', (req, res) => {
  res.send('Metric-Imperial Converter');
});

if (require.main === module) {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on port ${process.env.PORT || 3000}`);
  });
}

module.exports = app;