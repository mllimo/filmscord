const Content = require('../models/content').Contents;
const User = require('../models/user').Users;
const db_operations = require('../database/operations');
const movieApi = require('./movie-api');

async function insertContent(data, id) {
  const findFunction = data.category === 'movie' ? movieApi.getMovieInfo : movieApi.getTvInfo;
  content = await Content.findOne({ title: { id: data.id }, category: data.category });

  if (!content) {
    info = await findFunction(data.id);
    content = new Content(info);
    await content.save();
  }
  
  await db_operations.findOneAndUpdate(User,
    {
      _id: id,
      'contents.info.title.id': { $ne: info.title.id, },
    },
    {
      $push: {
        contents: {
          info: content,
          rate: data.rate,
          comment: data.comment,
          date_watched: data.date_watched
        }
      }
    });

  return {...data, info};
}

module.exports = {
  insertContent
}