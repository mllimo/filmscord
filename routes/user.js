const user_controller = require('../controllers/user');
const db_validator = require('../validators/db');
const fields_validator = require('../validators/fields');
const { check } = require('express-validator');
const { Router } = require('express');

const router = new Router();

router.post('/:username', (req, res) => {
  const username = req.params.username;
  res.json({ message: `User ${username}` });
});




module.exports = router;