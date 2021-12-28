const db_operatios = require('../database/operations');
const Content = require('../models/content').Contents;
const movie_api = require('../helpers/movie-api');
const { request, resonse } = require('express');
const checker = require('../helpers/checker');
const User = require('../models/user').Users;
const utils = require('../helpers/utils');
const bcrypt = require('bcryptjs');


// TODO: refactorizar
async function postUser(req = request, res = response) {
  const body = req.body;

  try {
    let info;
    let content;
    if (body.category === 'movie') {
      content = await Content.findOne({ title: { text: body.title }, category: body.category });
      if (!content) {
        info = await movie_api.getMovieInfo(body.title);
        body.title = info.title;
        body.cover = info.cover;
        body.genres = info.genres;
        body.release_date = info.release_date;
        body.runtime = info.runtime;

        content = new Content(body);
        await content.save();
      }

      await db_operatios.findByIdAndUpdate(User, req.id, {
        $push: {
          contents: {
            info: content,
            rate: body.rate,
            comment: body.comment,
            data_watched: body.data_watch
          }
        }
      });

      res.json({ message: 'Movie added to your library' });
    } else {
      info = await movie_api.getTvInfo(body.title);
      content = await Content.findOne({ title: { text: body.title }, category: body.category });

      if (!content) {
        info = await movie_api.getTvInfo(body.title);
        body.title = info.title;
        body.cover = info.cover;
        body.genres = info.genres;
        body.release_date = info.release_date;
        body.runtime = info.runtime;

        content = new Content(body);
        await content.save();
      }

      await db_operatios.findByIdAndUpdate(User, req.id, {
        $push: {
          contents: {
            info: content,
            rate: body.rate,
            comment: body.comment,
            data_watched: body.data_watch
          }
        }
      });

      res.json({ message: 'Tv added to your library' });
    }

  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Content could not be added' });
  }

}


module.exports = {
  postUser
}