const db_operatios = require('../database/operations');
const Content = require('../models/content').Contents;
const movie_api = require('../helpers/movie-api');
const { request, resonse } = require('express');
const checker = require('../helpers/checker');
const User = require('../models/user').Users;
const utils = require('../helpers/utils');
const bcrypt = require('bcryptjs');


async function postUser(req = request, res = response) {
  const body = req.body;

  try {
    const info = await movie_api.getMovieInfo(body.title);
    body.title = info.title;
    body.cover = info.cover;

    const content = new Content(body);
    await content.save();

    await db_operatios.findByIdAndUpdate(User, req.id, { $push: { contents: content } });
    res.json({ message: 'Content added' });
  } catch (error) {
    res.status(400).json({ message: 'Content could not be added' });
  }

}


module.exports = {
  postUser
}