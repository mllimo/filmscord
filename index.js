const Server = require('./models/server');
const server = new Server(process.env.PORT);
server.listen();