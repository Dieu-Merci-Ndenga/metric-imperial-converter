const express = require('express');
const convertHandler = require('../controllers/convertHandler');

const router = express.Router();
const handler = new convertHandler();

router.get('/convert/:input', (req, res) => {
  res.json(handler.convertInput(req.params.input));
});

module.exports = router;