const user_controller = require('../controllers/auth');
const db_validator = require('../validators/db');
const fields_validator = require('../validators/fields');
const { check } = require('express-validator');
const { Router } = require('express');
const router = new Router();


router.post('/signup', [
  check('username').notEmpty().withMessage('Username is required'),
  check('username').custom(db_validator.isUniqueUsername),
  check('email').isEmail().withMessage('Email is not valid'),
  check('email').custom(db_validator.isUniqueEmail),
  check('password').notEmpty().withMessage('Password is required'),
  fields_validator.validateFields
],
  user_controller.postSingUp
);

router.post('/login', [
  check('email_username').notEmpty().withMessage('Email or username is required'),
  check('email_username').custom(db_validator.existEmailUsername),
  check('password').notEmpty().withMessage('Password is required'),
  fields_validator.validateFields
],
  user_controller.postLogin
);

module.exports = router;
