const fields_validator = require('../validators/fields');
const { check, query } = require('express-validator');
const api_controller = require('../controllers/api');
const { Router } = require('express');
const router = Router();

router.get('/search', [
  query('page').isNumeric().withMessage('Page is not valid'),
  query('title').isString().withMessage('Title is not valid'),
  fields_validator.validateFields
] , api_controller.getApi);

module.exports = router;