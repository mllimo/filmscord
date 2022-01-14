const Content = require('../models/content').Contents;
const User = require('../models/user').Users;
const utils = require('../helpers/utils');
const chai_http = require('chai-http');
const server = require('./test');
const chai = require('chai');
chai.use(chai_http);

const describe = require('mocha').describe;
const expect = chai.expect;

describe('POST /api/auth', () => {
  const SIGNUP_URL = '/api/auth/signup';
  const LOGIN_URL = '/api/auth/login';

  const username_1 = 'test_user_1';
  const password_1 = 'test_password_1';
  const email_1 = 'test1@test.com';

  before(async () => {
    await User.deleteMany({});
    await Content.deleteMany({});
  });

  afterEach(async () => {
    await User.deleteMany({});
    await Content.deleteMany({});
  });

  it('It should signup a user', async function () {
    const res = await chai.request(server)
      .post(SIGNUP_URL)
      .type('json')
      .send({
        username: username_1,
        password: password_1,
        email: email_1
      });
    expect(res).to.have.status(200);
    expect(res.body).have.a.property('token');
  });

  it('It should signup a user and return token and username', async function () {
    const res = await chai.request(server)
      .post(SIGNUP_URL)
      .type('json')
      .send({
        username: username_1,
        password: password_1,
        email: email_1
      });

    expect(res).to.have.status(200);
    expect(res.body).have.a.property('token');
    expect(res.body).have.a.property('username');
    expect(res.body.username).to.equal(username_1);
  });

  it('It should login a user', async function () {
    const user = new User({ username: username_1, password: password_1, email: email_1 });
    user.password = await utils.hashPassword(password_1);
    await user.save();

    const res = await chai.request(server)
      .post(LOGIN_URL)
      .type('json')
      .send({
        email_username: username_1,
        password: password_1,
      });

    expect(res.statusCode).to.equal(200);
    expect(res.body).not.to.be.null;
  });


  it('It should login and return token and username', async function () {
    const user = new User({ username: username_1, password: password_1, email: email_1 });
    user.password = await utils.hashPassword(password_1);
    await user.save();

    const res = await chai.request(server)
      .post(LOGIN_URL)
      .type('json')
      .send({
        email_username: username_1,
        password: password_1,
      });

    expect(res.statusCode).to.equal(200);
    expect(res.body).have.a.property('token');
    expect(res.body).have.a.property('username');
    expect(res.body.username).to.equal(username_1);
  });

  it('It should not login a user with wrong credentials', async function () {
    const res = await chai.request(server)
      .post(LOGIN_URL)
      .type('json')
      .send({
        email_username: 'test',
        password: 'wrong'
      });
    expect(res).to.have.status(422);
  });

});