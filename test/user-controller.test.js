require('dotenv').config({ path: `${__dirname}.env.test` })
const chai_http = require('chai-http');
const chai = require('chai');

chai.use(chai_http); 
const describe = require('mocha').describe;
const { header } = require('express/lib/request');
const expect = chai.expect;

const BASE_URL = 'http://localhost:' + process.env.PORT;
const SIGNUP_URL = '/api/auth/signup';
const LOGIN_URL = '/api/auth/login';

describe('UserController', () => {

  it('It should signup a user', (done) => {
    chai.request(BASE_URL)
      .post(SIGNUP_URL)
      .type('json')
      .send({
        username: 'test',
        password: 'test',
        email: 'test@test.es'
      })
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('authorization');
        done();
      })
      .catch((err) => done(err));
  });

  it('It should login a user', (done) => {
    chai.request(BASE_URL)
      .post(LOGIN_URL)
      .type('json')
      .send({
        email_username: 'test',
        password: 'test'
      })
      .then((req, res) => {
        console.log(res);
        expect(res.body).not.eql({});
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('authorization');
        done();
      })
      .catch((err) => done(err));
  });

  it('It should not login a user with wrong credentials', (done) => {
    chai.request(BASE_URL)
      .post(LOGIN_URL)
      .type('json')
      .send({
        username: 'test',
        password: 'wrong'
      })
      .then((res) => {
        expect(res).to.have.status(401);
        done();
      })
      .catch((err) => done(err));
  });

});