const db_operations = require('../database/operations');
const Content = require('../models/content').Contents;
const movie_api = require('../helpers/movie-api');
const { request, resonse } = require('express');
const checker = require('../helpers/checker');
const User = require('../models/user').Users;
const utils = require('../helpers/utils');
const bcrypt = require('bcryptjs');

async function insertContent(data, id) {
  const findFunction = data.category === 'movie' ? movie_api.getMovieInfo : movie_api.getTvInfo;
  content = await Content.findOne({ title: { text: data.title }, category: data.category });
  if (!content) {
    info = await findFunction(data.title);
    data = { ...data, ...info };
    content = new Content(data);
    content.save();
  }
  await db_operations.findOneAndUpdate(User,
    {
      _id: id,
      'contents.info.title.id': { $ne: data.title.id,},
    },
    {
      $push: {
        contents: {
          info: content,
          rate: data.rate,
          comment: data.comment,
          data_watched: data.data_watch
        }
      }
    });
}


async function postUserContent(req = request, res = response) {
  const body = req.body;
  try {
    await insertContent(body, req.id);
    if (body.category === 'movie') {
      res.json({ message: 'Movie added to your library' });
    } else {
      res.json({ message: 'Tv added to your library' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function getUserContent(req = request, res = response) {
  console.log(req.id)
  try {
    const user = await User.findOne({ _id: req.id });
    res.json(user.contents);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}


module.exports = {
  postUserContent,
  getUserContent
}