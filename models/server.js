const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../db/config');
const userRoute = require('../routes/users');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            // this Can even have more
            userRoute: '/api/users' 
        }

        // DB connection
        this.conectarDB();
        
        // MIDDLEWARES
        this.middlewares();

        // ROUTES
        this.routes();

    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){

        // using cors
        this.app.use(cors());

        // Parsing request
        this.app.use(express.json())

    }

    routes(){
        this.app.use(this.paths.userRoute, userRoute);
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }
}

module.exports = {
    Server
};