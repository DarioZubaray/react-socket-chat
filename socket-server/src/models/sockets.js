
class Sockets {

    constructor( io ) {

        this.io = io;
        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {
            console.log('Client connected');
        });
    }
}

module.exports = Sockets;
