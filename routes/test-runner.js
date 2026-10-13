const Mocha = require('mocha');
const EventEmitter = require('events');
const fs = require('fs');
const path = require('path');
const assertionAnalyser = require('../assertion-analyser');

const mocha = new Mocha({
  ui: 'tdd',
  timeout: 5000
});

const testDir = path.join(__dirname, '..', 'tests');

fs.readdirSync(testDir).filter(file => file.endsWith('.js')).forEach(file => {
  mocha.addFile(path.join(testDir, file));
});

const runner = new EventEmitter();
runner.run = function () {
  const tests = [];
  let context = '';
  const separator = ' -> ';
  const mochaRunner = mocha.run(failures => {
    console.log(`Tests completed with ${failures} failures.`);
  });

  mochaRunner.on('test end', test => {
    const body = test.body.replace(/\/\/.*\n|\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ');
    tests.push({
      title: test.title,
      context: context.slice(0, -separator.length),
      state: test.state,
      assertions: assertionAnalyser(body)
    });
  });

  mochaRunner.on('suite', suite => {
    context += suite.title + separator;
  });

  mochaRunner.on('suite end', suite => {
    context = context.slice(0, -(suite.title.length + separator.length));
  });

  mochaRunner.on('end', () => {
    runner.report = tests;
    runner.emit('done', tests);
  });
};

module.exports = runner;