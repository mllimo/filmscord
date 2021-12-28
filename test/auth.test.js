const User = require('../models/user').Users;
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

  beforeEach(async () => {
    await User.deleteMany({});
  });

  it('It should signup a user', async function () {
    chai.request(server)
      .post(SIGNUP_URL)
      .type('json')
      .send({
        username: username_1,
        password: password_1,
        email: email_1
      })
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).have.a.property('token');
        done();
      })
      .catch((err) => err);
  });

  it('It should login a user', async function () {
    const user = new User({ username: username_1, email: email_1, password: password_1 });
    user.save();

    chai.request(server)
      .post(LOGIN_URL)
      .type('json')
      .send({
        email_username: username_1,
        password: password_1,
      })
      .then(async (res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).not.eql(null);
        done();
      })
      .catch(async (err) => done(err));
  }).timeout(5000);

  it('It should not login a user with wrong credentials', async function () {
    chai.request(server)
      .post(LOGIN_URL)
      .type('json')
      .send({
        email_username: 'test',
        password: 'wrong'
      })
      .then((res) => {
        expect(res).to.have.status(400);
      })
      .catch((err) => done(err));
  });

});