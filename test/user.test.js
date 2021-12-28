const User = require('../models/user').Users;
const Content = require('../models/content').Contents;
const chai = require('chai');
const chai_http = require('chai-http');
const server = require('./test');

const describe = require('mocha').describe;
const expect = chai.expect;

describe('User', function() {
  const username_1 = 'test_user_1';
  const password_1 = 'test_password_1';
  const email_1 = 'test1@test.com';

  const title_1 = 'Spiderman';
  const category_1 = 'movie';

  
  beforeEach(async () => {
    const user = new User({username_1, email_1, password_1});
    const content = new Content({title: {text: title_1}, category_1});
    await user.save();
    await content.save();
  });

  afterEach(async () => {
    await User.deleteMany({});
    await Content.deleteMany({});
  }); 

  describe('POST /api/user', function() {
    
  });

  describe('GET /api/user', function() {

  });

  describe('PUT /api/user', function() {

  });

  describe('DELETE /api/user', function() {

  });

}); 


