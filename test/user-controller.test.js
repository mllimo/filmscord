require('dotenv').config({ path: `${__dirname}.env.test` });
const chaiHttp = require('chai-http');
const chai = require('chai');
const mocha = require('mocha');


const describe = mocha.describe;
const expect = chai.expect;
chai.use(chaiHttp);

const BASE_URL = 'http://localhost:' + process.env.PORT + '/api/signup';
const SIGNUP_URL = '/api/signup';

describe('UserController', () => {
  it('It should signup a user', (done) => {
    chai.request(BASE_URL)
      .post(SIGNUP_URL)
      .send({
        username: 'test',
        password: 'test',
        email: 'test@test.es'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('authorization');
      });
    done();
  });
});