const Content = require('../models/content').Contents;
const User = require('../models/user').Users;
const utils = require('../helpers/utils');
const server = require('./test');
const chai = require('chai');

const describe = require('mocha').describe;
const expect = chai.expect;

describe('User', function () {
  const USER_URL = '/api/user';
  const username = 'test_user_2';
  const password = 'test_password_2';
  const email = 'test2@test.com';

  const title_1 = 'Spiderman';
  const category_1 = 'movie';
  let content_1 = {};
  let token;

  beforeEach(async () => {
    await User.deleteMany({});
    await Content.deleteMany({});
    content_1 = { title: { text: title_1 }, category_1 };
    const user = new User({ username, email, password });
    const content = new Content({ title: { text: title_1 }, category: category_1 });
    token = await utils.generateToken(user._id);
    await user.save();
    await content.save();
  });

  describe('POST /api/user',  () => {
    it ('It should add content', async function() {
      chai.request(server)
      .post(USER_URL)
      .type('json')
      .set('authorization', token)
      .send(content_1)
      .then((res) => {
        expect(res).to.have.status(200);
        done();
      })
      .catch((err) => err);
    });
  });

  describe('GET /api/user', function () {

  });

  describe('PUT /api/user', function () {

  });

  describe('DELETE /api/user', function () {

  });

});


