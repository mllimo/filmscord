const user_controller = require('../controllers/user');
const fields_validator = require('../validators/fields');
const { check } = require('express-validator');
const { Router } = require('express');

const router = new Router();

router.post('/:username', [
  fields_validator.validateJwt,
  check('title').notEmpty().withMessage('Title is required'),
], user_controller.postUser);




module.exports = router;