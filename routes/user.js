const user_controller = require('../controllers/user');
const db_validator = require('../validators/db');
const fields_validator = require('../validators/fields');
const { check } = require('express-validator');
const { Router } = require('express');
const router = new Router();


router.post('/signup', [
  check('username').notEmpty(),
  check('username').custom(db_validator.isUniqueUsername),
  check('email').isEmail(),
  check('email').custom(db_validator.isUniqueEmail),
  check('password').notEmpty(),
  fields_validator.validateFields
],
  user_controller.postSingUp
);

router.post('/login', [
  check('email_username').notEmpty(),
  check('password').notEmpty(),
  fields_validator.validateFields
],
  user_controller.postLogin
);



module.exports = router;