const Mocha = require('mocha');
const fs = require('fs');
const path = require('path');

const mocha = new Mocha({
  ui: 'tdd',
  timeout: 5000
});

const testDir = path.join(__dirname, '..', 'tests');

fs.readdirSync(testDir).filter(file => file.endsWith('.js')).forEach(file => {
  mocha.addFile(path.join(testDir, file));
});

const runner = {
  run: function() {
    try {
      let tests = [];
      const mochaRunner = mocha.run(failures => {
        console.log(`Tests completed with ${failures} failures.`);
      });

      mochaRunner.on('pass', test => {
        tests.push({ title: test.title, fullTitle: test.fullTitle(), state: 'passed' });
      });

      mochaRunner.on('fail', (test, err) => {
        tests.push({ title: test.title, fullTitle: test.fullTitle(), state: 'failed', err: err.message });
      });

      mochaRunner.on('end', () => {
        runner.report = tests;
      });
    } catch (e) {
      console.error('Error running tests:', e);
    }
  }
};

module.exports = runner;