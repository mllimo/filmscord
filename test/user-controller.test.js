require('dotenv').config({ path: `${__dirname}.env.test` })
const auth_helper = require('../test/helpers/auth');
const User = require('../models/user').Users;
const chai_http = require('chai-http');
const axios = require('axios');
const chai = require('chai');

const describe = require('mocha').describe;
const expect = chai.expect;
chai.use(chai_http);

describe('POST /api/auth', () => {
  const username_1 = 'test_user_1';
  const password_1 = 'test_password_1';
  const email_1 = 'test1@test.com';

  const body_signup_1 = {
    username: username_1,
    password: password_1,
    email: email_1
  };

  const body_login_1 = {
    email_username: username_1,
    password: password_1,
    email: email_1
  };

  afterEach(async () => {
    await User.deleteMany({ username: username_1, email: email_1 });
  });

  it('It should signup a user', async function() {
    chai.request(auth_helper.BASE_URL)
      .post(auth_helper.SIGNUP_URL)
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

  it('It should login a user', async function() {
    await auth_helper.signUpUser(username_1, email_1, password_1);

    chai.request(auth_helper.BASE_URL)
      .post(auth_helper.LOGIN_URL)
      .type('json')
      .send({
          email_username: username_1,
          password: password_1,
      })
      .then((res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).not.eql(null);
        done();
      })
      .catch((err) => err);
  }).timeout(5000);

  it('It should not login a user with wrong credentials', async function() {
    chai.request(auth_helper.BASE_URL)
      .post(auth_helper.LOGIN_URL)
      .type('json')
      .send({
        username: 'test',
        password: 'wrong'
      })
      .then((res) => {
        expect(res).to.have.status(400);
      })
      .catch((err) => err);
  });

});