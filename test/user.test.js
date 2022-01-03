const Content = require('../models/content').Contents;
const User = require('../models/user').Users;
const utils = require('../helpers/utils');
const chai_http = require('chai-http');
const server = require('./test');
const chai = require('chai')

chai.use(chai_http);

const describe = require('mocha').describe;
const should = chai.should;
const expect = chai.expect;

describe('User', function () {
  const USER_URL = '/api/user';
  const username = 'test_user_2';
  const password = 'test_password_2';
  const email = 'test2@test.com';
  let user_id;

  const title_1 = 'Spiderman';
  const title_2 = 'Black Mirror';
  const category_1 = 'movie';
  const category_2 = 'tv';
  let content_1 = {};
  let content_2 = {};
  let send_content_1 = {};
  let send_content_2 = {};
  let token;

  beforeEach(async () => {
    await User.deleteMany({});
    await Content.deleteMany({});
    content_1 = { title: { text: title_1 }, category: category_1 };
    content_2 = { title: { text: content_2 }, category: category_2, rate: 5, comment: 'test comment' };
    send_content_1 = { title: title_1, category: category_1 };
    send_content_2 = { title: title_2, category: category_2, rate: 5, comment: 'test comment' };
    const user = new User({ username, email, password });
    token = await utils.generateToken(user._id);
    await user.save();
  });

  afterEach(async () => {
    await User.deleteMany({});
    await Content.deleteMany({});
  });

  describe('Get /api/user/', function () {
    it('It should return a user info without the password ', async () => {
      const res = await chai.request(server)
        .get(USER_URL + '/' + username)
        .set('authorization', token);
        
      expect(res).have.status(200);
      expect(res.body).to.not.have.property('password');
      expect(res.body).have.to.be.a('object');
      expect(res.body).to.have.property('username').equal(username);
      expect(res.body).to.have.property('email').equal(email);
      expect(res.body).to.have.property('contents').to.deep.equal([]);
    });
  });

  describe('UPDATE /api/user/', function () {
    it('It should update the username of a user', async () => {
      const fields = { fields: {username: 'update_username'} };
      const res = await chai.request(server)
        .put(USER_URL + '/' + username)
        .set('authorization', token)
        .send(fields);

      expect(res).have.status(200);
      const user = await User.findOne({ username: 'update_username' });
      expect(user).to.not.be.null;
    }).timeout(10000);
  });
  
  describe('DELETE /api/user/', function () {
    it('It should remove the user', async () => {
      const res = await chai.request(server)
        .get(USER_URL + '/' + username)
        .set('authorization', token);
        
      expect(res).have.status(200);
      const user = await User.findOne({ _id: res.body.id });
      expect(user).to.be.equal(null);
    });
  });


  describe('POST /api/user/:username/content', function () {
    it('It should add content with the title and categoty=movie', async function () {
      const res = await chai.request(server)
        .post(USER_URL + '/' + username + '/content')
        .type('json')
        .set('authorization', token)
        .send(send_content_1);

      expect(res).to.have.status(200);
      const added = (await User.findOne({ username })).contents
      expect(added).to.have.lengthOf(1);
    });

    it('It should add content with the title and categoty=tv', async function () {
      const res = await chai.request(server)
        .post(USER_URL + '/' + username + '/content')
        .type('json')
        .set('authorization', token)
        .send(send_content_2);
      expect(res).to.have.status(200);
      const added = (await User.findOne({ username })).contents
      expect(added).not.to.be.null;
      expect(added).to.have.lengthOf(1);
    });

    it('It should add content with all the info', async function () {
      const res = await chai.request(server)
        .post(USER_URL + '/' + username + '/content')
        .type('json')
        .set('authorization', token)
        .send(send_content_2);
      expect(res).to.have.status(200);
      const added = (await User.findOne({ username })).contents
      expect(added).to.have.lengthOf(1);
      expect(added[0].rate).to.equal(5);
      expect(added[0].comment).to.equal('test comment');
    });

    it('It should add content not duplicated', async function () {
      await chai.request(server)
        .post(USER_URL + '/' + username + '/content')
        .type('json')
        .set('authorization', token)
        .send(send_content_2);

      await chai.request(server)
        .post(USER_URL + '/' + username + '/content')
        .type('json')
        .set('authorization', token)
        .send(send_content_2);

      const size = (await User.findOne({ username })).contents.length;
      expect(size).to.equal(1);
    });

  });

  describe('GET /api/user/:username/content', function () {
    it('It should get the user\'s content', async function () {
      await chai.request(server)
        .post(USER_URL + '/' + username + '/content')
        .type('json')
        .set('authorization', token)
        .send(send_content_2);

      await chai.request(server)
        .post(USER_URL + '/' + username + '/content')
        .type('json')
        .set('authorization', token)
        .send(send_content_1);

      const res = await chai.request(server)
        .get(USER_URL + '/' + username + '/content')
        .type('json')
        .set('authorization', token);

      expect(res).to.have.status(200);
      expect(res.body).to.have.lengthOf(2);
    });
  });

  describe('PUT /api/user', function () {

    it('It should let modify rate field', async function () {
      const id = (await chai.request(server)
        .post(USER_URL + '/' + username + '/content')
        .type('json')
        .set('authorization', token)
        .send(send_content_1)).body.content;

      const res = await chai.request(server)
        .put(USER_URL + '/' + username + '/content')
        .type('json')
        .set('authorization', token)
        .send({ fields: { rate: 10 }, 'id': id });
      
      expect(res).to.have.status(200);
      user = await User.findOne({ username });
      //console.log(user.contents[0].info);
      const content = user.contents.find(content => content.info.title.id === id);
      expect(content.rate).to.equal(10);
    });

    it('It should let modify comment field', async function () {
      const id = (await chai.request(server)
        .post(USER_URL + '/' + username + '/content')
        .type('json')
        .set('authorization', token)
        .send(send_content_1)).body.content;

      const res = await chai.request(server)
        .put(USER_URL + '/' + username + '/content')
        .type('json')
        .set('authorization', token)
        .send({ fields: { comment: 'genial' }, 'id': id });
        //console.log(res);
      expect(res).to.have.status(200);
      user = await User.findOne({ username });
      const content = user.contents.find(content => content.info.title.id === id);
      expect(content.comment).to.equal('genial');
    });

    it('It should let modify data_watched field', async function () {
      const date = new Date();
      const id = (await chai.request(server)
        .post(USER_URL + '/' + username + '/content')
        .type('json')
        .set('authorization', token)
        .send(send_content_1)).body.content;

      const res = await chai.request(server)
        .put(USER_URL + '/' + username + '/content')
        .type('json')
        .set('authorization', token)
        .send({ fields: { date_watched: date }, 'id': id });

      expect(res).to.have.status(200);
      user = await User.findOne({ username });
      expect(user.contents[0].date_watched).to.deep.equal(date);
    });

    it('It should let modify all fields', async function () {
      const date = new Date();
      const id = (await chai.request(server)
        .post(USER_URL + '/' + username + '/content')
        .type('json')
        .set('authorization', token)
        .send(send_content_1)).body.content;

      const res = await chai.request(server)
        .put(USER_URL + '/' + username + '/content')
        .type('json')
        .set('authorization', token)
        .send({ fields: { date_watched: date, rate: 5, comment: 'genial' }, 'id': id });

      expect(res).to.have.status(200);
      user = await User.findOne({ username });
      expect(user.contents[0].date_watched).to.deep.equal(date);
      expect(user.contents[0].rate).to.equal(5);
      expect(user.contents[0].comment).to.equal('genial');
    });

  });

  describe('DELETE /api/user/:username/content', function () {
    it('It should delete a user content', async function () {
      const id = (await chai.request(server)
        .post(USER_URL + '/' + username + '/content')
        .type('json')
        .set('authorization', token)
        .send(send_content_1)).body.content;

      const res = await chai.request(server)
        .delete(USER_URL + '/' + username + '/content/')
        .type('json')
        .set('authorization', token)
        .send({
          ids: [id]
        });

      expect(res).to.have.status(200);
      user = await User.findOne({ username, $contents: { info: { title: { 'id': id } } } });
      expect(user.contents).to.be.empty;
    });
  });


});


