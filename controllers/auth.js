const { request, resonse } = require('express');
const checker = require('../helpers/checker');
const User = require('../models/user').Users;
const utils = require('../helpers/utils');

async function postLogin(req, res) {
  const body = req.body;
  let user;

  if (checker.isEmail(body.email_username)) {
    user = await User.findOne({ email: body.email_username });
    if (!user) return res.status(400).json({ message: 'Email does not exist' });
  } else {
    user = await User.findOne({ username: body.email_username });
    if (!user) return res.status(400).json({ message: 'Username does not exist' });
  }

  if (!await bcrypt.compare(body.password, user.password)) 
    return res.status(400).json({ message: 'Password does not match' });

  const token = await utils.generateToken(user._id);
  res.json({ message: 'Login successful', token: token });
}

async function postSingUp(req, res) {
  const body = req.body;
  const user = new User(body);

  user.password = await utils.hashPassword(body.password);

  try {
    const token = await utils.generateToken(user._id);
    await user.save(); 
    res.json({ message: 'User created', token: token });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Signup error' });
  }

}

module.exports = {
  postLogin,
  postSingUp
}