const bcrypt = require('bcrypt');
const { request, resonse } = require('express');

async function postLogin(req, res) {
  const { email_username, password} = req.body;
  
}

async function postRegister(req, res) {
  
}

module.exports = {
  postLogin,
  postRegister
}