require('dotenv').config({ path: `${__dirname}.env.test` })
const chai_http = require('chai-http');
const chai = require('chai');

chai.use(chai_http); 
const describe = require('mocha').describe;
const expect = chai.expect;

const BASE_URL = 'http://localhost:' + process.env.PORT + '/api/signup';
const SIGNUP_URL = '/api/signup';

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
      });
    done();
  });
});