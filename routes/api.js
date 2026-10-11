const express = require('express');
const convertHandler = require('../controllers/convertHandler');

const router = express.Router();

router.get('/convert/:input', (req, res) => {
  res.json(convertHandler(req.params.input));
});

module.exports = router;