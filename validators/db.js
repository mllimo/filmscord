const {request, response} = require('express');
const checker = require('../helpers/checker');
const User = require('../models/user').Users;

async function isUniqueUsername(username_field) {
  const username = await User.findOne({username: username_field});
  if (username) throw new Error('Username already exists'); 
}

async function isUniqueEmail(email_field) {
  const email = await User.findOne({email: email_field});
  if (email) throw new Error('Email already exists'); 
}

async function existEmailUsername(email_username_field) {
  if (checker.isEmail(email_username_field)) {
    const email  = await User.findOne({email: email_username_field});
    if (!email) throw new Error('Email does not exist');
  } else {
    const username = await User.findOne({username: email_username_field});
    if (!username) throw new Error('Username does not exist');
  }
}

module.exports = {
  isUniqueUsername,
  isUniqueEmail,
  existEmailUsername,
}