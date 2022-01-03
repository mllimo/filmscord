const { request, response } = require('express');
const movie_api = require('../helpers/movie-api');

async function getApi(req = request, res = response) {
  const query = req.query;
  try {
    const data = await movie_api.getContent(query.title, query.page);
    res.json(data);
  } catch (error) {
    res.json.status(400).json({ message: error.message });
  }
}

module.exports = {
  getApi,
}