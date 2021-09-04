const { Server } = require('./models/server');

require('dotenv').config();

// Bring Server and init it

const server = new Server();

server.listen();