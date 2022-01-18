const db = require('../database/config');
const express = require('express');
const cors = require('cors');

class Server {
  constructor(port = 8080) {
    this.app = express();
    this.port = port;
    
    this.startDb();

    this.middlewares();

    this.routes();
  }

  startDb() {
    try {
      db.connect();
      console.log('Database connected');
    } catch (error) {
      console.log('Database connection error: ', error);
    }
  }

  middlewares() {
    this.app.use(cors())
    this.app.use(express.json());
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use('/api/auth', require('../routes/auth'));
    this.app.use('/api/user', require('../routes/user'));
    this.app.use('/api', require('../routes/api'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is listening on port ${this.port}`);
    });
  }

  close() {
    this.app.close();
  }
  
};

module.exports = Server;
