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
      language: 'es'
    }
  }
}

function getMovies(title) {
  return {
    baseURL: API_SEARCH_MOVIE_URL,
    params: {
      api_key: process.env.MOVIEDB_TOKEN,
      language: 'es',
      query: title,
    }
  };
}

function getTvs(title) {
  return {
    baseURL: API_SEARCH_TV_URL,
    params: {
      api_key: process.env.MOVIEDB_TOKEN,
      language: 'es',
      query: title,
    }
  };
}

function getParamsMovie(id) {
  return {
    baseURL: API_MOVIE_URL + '/' + id,
    params: {
      api_key: process.env.MOVIEDB_TOKEN,
      language: 'es',
    }
  };
}

function getParamsTv(id) {
  return {
    baseURL: API_TV_URL + '/' + id,
    params: {
      api_key: process.env.MOVIEDB_TOKEN,
      language: 'es',
    }
  };
}

// TODO: refactorizar
async function getMovieInfo(title) {
  const info = { title: {} };
  const basic_info = axios.create(getMovies(title));
  let data;
  try {
    data = (await basic_info.get()).data;
  } catch (error) {
    throw new Error('Movie not found');
  }
  info.cover = IMAGE_URL + data.results[0].poster_path;
  info.title.text = data.results[0].name;
  info.title.id = data.results[0].id;

  const extended_info = axios.create(getParamsMovie(info.title.id));
  const data_extended = (await extended_info.get()).data;
  data_extended.genres.map(item => {
    const text = item.name;
    item.text = text;
    delete item.name;
    return item;
  });

  info.title.text = data_extended.original_title;
  info.genres = data_extended.genres;
  info.runtime = data_extended.runtime;
  info.release_date = data_extended.release_date;

  return info;
}

// TODO: refactorizar
async function getTvInfo(title) {
  const info = { title: {} };
  const basic_info = axios.create(getTvs(title));
  let data;
  try {
    data = (await basic_info.get()).data;
  } catch (error) {
    throw new Error('Tv not found');
  }
  info.cover = IMAGE_URL + data.results[0].poster_path;
  info.title.text = data.results[0].name;
  info.title.id = data.results[0].id;

  const extended_info = axios.create(getParamsTv(info.title.id));
  const data_extended = (await extended_info.get()).data;
  data_extended.genres.map(item => {
    const text = item.name;
    item.text = text;
    delete item.name;
    return item;
  });

  info.title.text = data_extended.original_title;
  info.genres = data_extended.genres;
  info.runtime = data_extended.runtime;
  info.release_date = data_extended.release_date;

  return info;
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