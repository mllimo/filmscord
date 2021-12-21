const bcrypt = require('bcryptjs');
const { request, resonse } = require('express');

async function postLogin(req, res) {
  const { email_username, password} = req.body;
  
}

async function postSingUp(req, res) {
  
}

module.exports = {
  postLogin,
  postSingUp
}