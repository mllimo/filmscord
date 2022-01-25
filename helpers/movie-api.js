const axios = require('axios');

const API_SEARCH_MULTI_URL = 'https://api.themoviedb.org/3/search/multi';
const API_SEARCH_MOVIE_URL = 'https://api.themoviedb.org/3/search/movie';
const API_SEARCH_TV_URL = 'https://api.themoviedb.org/3/search/tv';
const API_MOVIE_URL = 'https://api.themoviedb.org/3/movie';
const API_TV_URL = 'https://api.themoviedb.org/3/tv'
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';


// TODO: refactorizar
function getMulti(title, page) {
  return {
    baseURL: API_SEARCH_MULTI_URL,
    params: {
      api_key: process.env.MOVIEDB_TOKEN,
      query: title,
      page: page,
      language: 'en'
    }
  }
}

function getMovies(title) {
  return {
    baseURL: API_SEARCH_MOVIE_URL,
    params: {
      api_key: process.env.MOVIEDB_TOKEN,
      language: 'en',
      query: title,
    }
  };
}

function getTvs(title) {
  return {
    baseURL: API_SEARCH_TV_URL,
    params: {
      api_key: process.env.MOVIEDB_TOKEN,
      language: 'en',
      query: title,
    }
  };
}

function getParamsMovie(id) {
  return {
    baseURL: API_MOVIE_URL + '/' + id,
    params: {
      api_key: process.env.MOVIEDB_TOKEN,
      language: 'en',
    }
  };
}

function getParamsTv(id) {
  return {
    baseURL: API_TV_URL + '/' + id,
    params: {
      api_key: process.env.MOVIEDB_TOKEN,
      language: 'en',
    }
  };
}

async function getContentCategory(id, category) {
  let getParams;
  let data, info = {};
  if (category == 'movie') { getParams = getParamsMovie; }
  else if (category == 'tv') { getParams = getParamsTv; }
  else throw new Error('Category not found');

  try {
    data_request = axios.create(getParams(id));
    data = (await data_request.get()).data;
  } catch (error) {
    throw new Error(category + ' not found');
  }
  
  info.cover = IMAGE_URL + data.poster_path;
  info.title = {text: data.name, id: data.id};
  info.category = category;
  info.genres = data.genres;
  info.runtime = data.runtime ? data.runtime : data.episode_run_time;
  info.release_date = data.release_date ? data.release_date : data.first_air_date;
  return info;
}

// TODO: refactorizar
async function getMovieInfo(id) {
  return getContentCategory(id, 'movie');
}

// TODO: refactorizar
async function getTvInfo(id) {
  return getContentCategory(id, 'tv');
}

async function getContent(title, page) {
  const multi = axios.create(getMulti(title, page));
  const { results, total_pages, total_results } = (await multi.get()).data;
  const info = { results, total_pages, total_results };
  return info;
}

module.exports = {
  getMovieInfo,
  getTvInfo,
  getContent
};