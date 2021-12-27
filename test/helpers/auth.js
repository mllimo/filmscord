const axios = require('axios');

const BASE_URL = 'http://localhost:' + process.env.PORT;
const SIGNUP_URL = '/api/auth/signup';
const LOGIN_URL = '/api/auth/login';

async function signUpUser(username, email, password) {
  const body = {
    username,
    email,
    password
  };

  const response = await axios.post(BASE_URL + SIGNUP_URL, body);
  return response.data;
}

module.exports = {
  signUpUser,
  BASE_URL,
  SIGNUP_URL,
  LOGIN_URL
};