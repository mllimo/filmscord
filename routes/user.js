const user_controller = require('../controllers/user');
const db_validator = require('../validators/db');
const fields_validator = require('../validators/fields');
const { check } = require('express-validator');
const { Router } = require('express');

const router = new Router();

router.post('/:id', (req, res) => {
  const id = req.params.id;
  res.json({ message: `User ${id}` });
});




module.exports = router;