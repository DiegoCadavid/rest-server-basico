require('colors');
require('dotenv').config();

console.clear();

const Server = require('./models/server');
    
const server = new Server();

server.listen();