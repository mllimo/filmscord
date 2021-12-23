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

    if (req.category === 'movie') {

      const movie = await Content.findOne({ title: body.title });
      if (movie) {
        await db_operatios.findByIdAndUpdate(User, req.id, { $push: { contents: movie } });
      } else {
        const info = await movie_api.getMovieInfo(body.title);
        body.title = info.title;
        body.cover = info.cover;
        body.genres = info.genres;
        body.release_date = info.release_date;
        body.runtime = info.runtime;

        const content = new Content(body);
        await content.save();
      }

      await db_operatios.findByIdAndUpdate(User, req.id, { $push: { contents: content } });
      res.json({ message: 'Movie added to your library' });
    } else {

    }

    res.json({ message: 'Content added' });
  } catch (error) {
    res.status(400).json({ message: 'Content could not be added' });
  }

}


module.exports = {
  postUser
}