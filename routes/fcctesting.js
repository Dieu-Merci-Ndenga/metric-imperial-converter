const cors = require('cors');
const fs = require('fs');
const runner = require('./test-runner');

module.exports = function (app) {
  app.route('/_api/get-tests')
    .get(cors(), function (req, res) {
      if (!runner.report) {
        return res.json([{ status: 'unavailable' }]);
      }
      res.json(runner.report);
    });

  app.get('/_api/app-info', function (req, res) {
    res.json({ type: 'The freeCodeCamp Project', version: '1.0.0' });
  });
};