const express = require('express');
const cors = require('cors');
require('dotenv').config();


class Server {
  constructor(port = 8080) {
    this.app = express();
    this.port = port;

    this.middlewares();

    this.routes();
  }

  middlewares() {
    this.app.use(cors())
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/api/user', require('../routes/user'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is listening on port ${this.port}`);
    });
  }
};

module.exports = Server;
