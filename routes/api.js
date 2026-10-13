const express = require('express');
const convertHandler = require('../controllers/convertHandler');

const router = express.Router();
const handler = new convertHandler();

function convertQuery(req, res) {
  const input = req.query.input;
  if (!input) return res.send('invalid input');

  const initNum = handler.getNum(input);
  const initUnit = handler.getUnit(input);
  if (initNum === 'invalid number' && initUnit === 'invalid unit') {
    return res.send('invalid number and unit');
  }
  if (initNum === 'invalid number') return res.send('invalid number');
  if (initUnit === 'invalid unit') return res.send('invalid unit');

  const returnUnit = handler.getReturnUnit(initUnit);
  const returnNum = handler.convert(initNum, initUnit);
  return res.json({
    initNum,
    initUnit,
    returnNum,
    returnUnit,
    string: handler.getString(initNum, initUnit, returnNum, returnUnit)
  });
}

router.get('/convert', convertQuery);

router.get('/convert/:input', (req, res) => {
  res.json(handler.convertInput(req.params.input));
});

module.exports = router;