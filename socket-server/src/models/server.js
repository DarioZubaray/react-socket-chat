// Servidor de Express
const express  = require('express');
const http     = require('http');
const socketio = require('socket.io');
const path     = require('path');
const cors     = require('cors');

const Sockets  = require('./sockets');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {

        this.app  = express();
        this.port = process.env.PORT;

        dbConnection();

        // Http server
        this.server = http.createServer( this.app );

        this.app.use( cors() );
        this.app.use( express.json() );

        // sockets settings
        this.io = socketio( this.server, { /* settings */ } );
    }

    middlewares() {
        // Deploy public folder
        this.app.use( express.static( path.resolve( __dirname, '../public' ) ) );

        this.app.use( '/api/v1/login', require('../router/auth') );
        this.app.use( '/api/v1/message', require('../router/message') );
    }

    configurarSockets() {
        new Sockets( this.io );
    }

    execute() {

        // Inicializate Middlewares
        this.middlewares();

        // Inicializate sockets
        this.configurarSockets();

        // Inicializate Server
        this.server.listen( this.port, () => {
            console.log('Server corriendo en puerto:', this.port );
        });
    }
}

module.exports = Server;
