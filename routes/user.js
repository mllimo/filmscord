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
  fields_validator.validateFields
], user_controller.getUserContent);

router.put('/:username/content', [
  fields_validator.validateJwt,
  check('id').notEmpty().withMessage('Content Id is required'),
  check('fields').notEmpty().withMessage('Fields is required'),
  check('fields.rate').optional().isInt({ min: 0, max: 10 }).withMessage('Rate range is not valid'),
  check('fields.comment').optional().isString().withMessage('Comment format is not valid'),
  check('fields.date_watched').optional().isISO8601().withMessage('Date format is not valid'),
  fields_validator.validateFields
], user_controller.putUserContent);

router.delete('/:username/content', [
  fields_validator.validateJwt,
  fields_validator.validateFields
], user_controller.deleteUserContent);

module.exports = router;