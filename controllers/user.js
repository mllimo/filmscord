const { request, resonse } = require('express');
const checker = require('../helpers/checker');
const User = require('../models/user').Users;
const Content = require('../models/content').Contents;
const utils = require('../helpers/utils');
const bcrypt = require('bcryptjs');


async function postUser( req = request, response = response) {
  const body = req.body;
  const content = new Content(body);
  console.log(content);
  // Conectar con API de series para tener un titulo y caratula adecuados
}


module.exports = {
  postUser
}