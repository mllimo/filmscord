const chai_http = require('chai-http');
const server = require('./test');
const chai = require('chai')

chai.use(chai_http);

const describe = require('mocha').describe;
const should = chai.should;
const expect = chai.expect;

describe('API', function () {
  const USER_URL = '/api';
  const title = 'Spiderman';
  let page = 1;
  
  beforeEach(async () => {
    page = 1;
  });

  it ('It should return all the matches with an determinated title', async function() {
    const res = await chai.request(server)
      .get(USER_URL + '/search')
      .query({ title: title, page: page });

    expect(res).to.have.status(200);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('contents');
    expect(res.body).to.have.property('total_pages');
    expect(res.body).to.have.property('total_results');
  }).timeout(20000);
});