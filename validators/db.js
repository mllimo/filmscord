const {request, response} = require('express');
const User = require('../models/user');

async function isUniqueUsername(username_field) {
  const username = await User.findOne({username: username_field});
  if (username) throw new Error('Username already exists'); 
}

async function isUniqueEmail(email_field) {
  const email = await User.findOne({email: email_field});
  if (email) throw new Error('Email already exists'); 
}

module.exports = {
  isUniqueUsername,
  isUniqueEmail,
}