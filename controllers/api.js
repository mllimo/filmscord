const { request, response } = require('express');
const movie_api = require('../helpers/movie-api');

async function getApi(req = request, res = response) {
  const query = req.query;
  try {
    console.log(query);
    const data = await movie_api.getContent(query.title, query.page);
    res.json(data);
  } catch (error) {
    res.status(400).json({});
  }
}

module.exports = {
  getApi,
}