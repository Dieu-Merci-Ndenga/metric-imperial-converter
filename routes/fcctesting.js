const cors = require('cors');
const fs = require('fs');
const runner = require('./test-runner');

module.exports = function (app) {
  app.get('/_api/get-tests', cors(), function (req, res, next) {
    if (runner.report) return res.json(testFilter(runner.report, req.query.type, req.query.n));
    runner.once('done', report => res.json(testFilter(report, req.query.type, req.query.n)));
  });

  app.get('/_api/app-info', function (req, res) {
    res.json({ type: 'The freeCodeCamp Project', version: '1.0.0' });
  });
};

function testFilter(tests, type, number) {
  let filtered = tests;
  if (type === 'unit') {
    filtered = tests.filter(test => test.context.includes('Unit Tests'));
  } else if (type === 'functional') {
    filtered = tests.filter(test => test.context.includes('Functional Tests'));
  }
  if (number !== undefined) return filtered[number] || filtered;
  return filtered;
}