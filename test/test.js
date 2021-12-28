require('dotenv').config({ path: `${__dirname}/.env.test` });
const chai = require('chai');
const chai_http = require('chai-http');

const Server = require('../models/server');
const test_app = new Server(process.env.PORT);
test_app.listen();

chai.use(chai_http);
module.exports = test_app.app;