require('dotenv').config({ path: `${__dirname}/.env.test` });
const Server = require('../models/server');


const test_app = new Server(process.env.PORT);
test_app.listen();