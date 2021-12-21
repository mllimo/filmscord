const { request, resonse } = require('express');
const User = require('../models/user').Users;
const bcrypt = require('bcryptjs');


async function postLogin(req, res) {
  res.json({
    message: 'Login successful'
  });
}

async function postSingUp(req, res) {
  const body = req.body;
  const user = new User(body);

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(body.password, salt);

  try {
    await user.save();
    res.json({
      message: 'User created'
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }

}

module.exports = {
  postLogin,
  postSingUp
}