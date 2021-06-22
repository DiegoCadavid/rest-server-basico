const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users'

        //Conectar db
        this.connectDB();

        //middleware
        this.middlewares();

        this.routes();
    }

    middlewares () {
        //Directorio publico
        this.app.use(express.static('public'));

        //Lectura y parseo del body
        this.app.use( express.json());

        //Cors
        this.app.use(cors());
    }

    //ConectarDB
    async connectDB () {
        await dbConnection();
    }

    //Rutas
    routes() {
       this.app.use(this.usersPath, require('../routes/user'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('---------------------------------------------------------'.yellow);
            console.log('Servidor instanciando en el puerto ::'.green, this.port);
        });
    }

}

module.exports = Server;