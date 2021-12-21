const bcrypt = require('bcryptjs');
const { request, resonse } = require('express');

async function postLogin(req, res) {
  res.json({
    message: 'Login successful'
  });
}

async function postSingUp(req, res) {
  res.json({
    message: 'Signup successful'
  });
}

module.exports = {
  postLogin,
  postSingUp
}