const Content = require('../models/content').Contents;
const User = require('../models/user').Users;
const db_operations = require('../database/operations');
const movie_api = require('./movie-api');

async function insertContent(data, id) {
  const findFunction = data.category === 'movie' ? movie_api.getMovieInfo : movie_api.getTvInfo;
  content = await Content.findOne({ title: { id: data.id }, category: data.category });
  if (!content) {
    info = await findFunction(data.id);
    data = { ...data, ...info };
    content = new Content(data);
    content.save();
  }
  await db_operations.findOneAndUpdate(User,
    {
      _id: id,
      'contents.info.title.id': { $ne: data.title.id, },
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
  return data;
}

module.exports = {
  insertContent
}