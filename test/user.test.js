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
  let content_2 = {};
  let token;

  beforeEach(async () => {
    await User.deleteMany({});
    await Content.deleteMany({});
    content_1 = { title: { text: title_1 }, category: category_1 };
    content_2 = { title: { text: title_1 }, category: category_1, rate: 5, comment: 'test comment' };
    const user = new User({ username, email, password });
    const content = new Content({ title: { text: title_1 }, category: category_1 });
    token = await utils.generateToken(user._id);
    await user.save();
    await content.save();
  });

  describe('POST /api/user', () => {
    it('It should add content with the title and categoty', async function () {
      chai.request(server)
        .post(USER_URL)
        .type('json')
        .set('authorization', token)
        .send(content_1)
        .then((res) => {
          expect(res).to.have.status(200);
          const added = User.findOne({ username }).contents
          expect(added).to.have.lengthOf(1);
          done();
        })
        .catch((err) => err);
    });

    it('It should add content with all the info', async function () {
      chai.request(server)
        .post(USER_URL)
        .type('json')
        .set('authorization', token)
        .send(content_2)
        .then((res) => {
          expect(res).to.have.status(200);
          const added = User.findOne({ username }).contents
          expect(added).to.have.lengthOf(1);
          expect(added[0].rate).to.equal(5);
          expect(added[0].comment).to.equal('test comment');
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


