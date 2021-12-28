const User = require('../models/user').Users;
const Content = require('../models/content').Contents;
const utils = require('../helpers/utils');
const server = require('./test');
const chai = require('chai');

const describe = require('mocha').describe;
const expect = chai.expect;

describe('User', function () {
  const USER_URL = '/api/user';
  const username_1 = 'test_user_1';
  const password_1 = 'test_password_1';
  const email_1 = 'test1@test.com';

  const title_1 = 'Spiderman';
  const category_1 = 'movie';
  let content_1 = {};
  let token;

  beforeEach(async () => {
    content_1 = { title: { text: title_1 }, category_1 };
    const user = new User({ username_1, email_1, password_1 });
    const content = new Content({ title: { text: title_1 }, category_1 });
    token = await utils.generateToken(user._id);
    await user.save();
    await content.save();
  });

  afterEach(async () => {
    await User.deleteMany({});
    await Content.deleteMany({});
  });

  describe('POST /api/user', function () {
    it ('It should add content', async function() {
      chai.requiest(server)
      .post(USER_URL)
      .type('json')
      .header('Authorization', token)
      .send(content_1)
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).not.eql(null);
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


