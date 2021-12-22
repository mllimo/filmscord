const axios = require('axios');

const API_URL = 'https://api.themoviedb.org/3/search/collection?api_key=' + process.env.MOVIEDB_TOKEN + '&language=es';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

async function getMovieInfo(title) {
  const info = { title: '', cover_url: '' };
  const instance = axios.create({
    baseURL: API_URL,
    params: {
      query: title,
    }
  });
  
  const data = (await instance.get()).data;
  info.cover = IMAGE_URL + data.results[0].poster_path;
  info.title = data.results[0].name;

  return info;
}

module.exports = {
  getMovieInfo
};