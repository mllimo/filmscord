const user_controller = require('../controllers/user');
const fields_validator = require('../validators/fields');
const { check } = require('express-validator');
const { Router } = require('express');

const router = new Router();

router.post('/:username/content', [
  fields_validator.validateJwt,
  check('category').notEmpty().withMessage('Category is required'),
  check('category').matches(/^(movie|tv)$/).withMessage('Category is not valid'),
  check('title').notEmpty().withMessage('Title is required'),
  fields_validator.validateFields
], user_controller.postUserContent);

router.get('/:username/content', [
  fields_validator.validateJwt,
], user_controller.getUserContent);

router.delete('/:username/content', [
  fields_validator.validateJwt,
], user_controller.deleteUserContent);

module.exports = router;