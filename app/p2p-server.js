const Websocket = require('ws');

const P2P_PORT = process.env.P2P_PORT || 5001; // Default to port 5001 if not provided
const peers = process.env.PEERS ? process.env.PEERS.split(',') : []; // Check if peers are provided

class P2pserver {
    constructor(blockchain,transactionPool) {
        this.blockchain = blockchain;
        this.transactionPool = transactionPool  ;
        this.sockets = [];
    }

    listen() {
        const server = new Websocket.Server({ port: P2P_PORT });
        server.on('connection', socket => this.connectSocket(socket));

        this.connectToPeers(); // Connect to all the peers

        console.log(`Listening for p2p connections on port ${P2P_PORT}`);
    }

    connectSocket(socket) {
        this.sockets.push(socket);
        console.log('Socket connected');

        this.messageHandler(socket);
        this.sendChain(socket);

        // socket.send(JSON.stringify(this.blockchain.chain));
    }

    connectToPeers() {
        peers.forEach(peer => {
            const socket = new Websocket(peer);
            socket.on('open', () => this.connectSocket(socket));
            socket.on('error', (err) => {
                console.error(`Error connecting to peer ${peer}:`, err);
            });
        });
    }

    messageHandler(socket)
    {
        socket.on('message',message => {
            const data = JSON.parse(message);
            // console.log('data',data); it was to add chain by user

            this.blockchain.replaceChain(data);
        });
    }
    sendChain(socket)
    {
        socket.send(JSON.stringify(this.blockchain.chain));

    }

    syncChain()
    {
        this.sockets.forEach(socket => this.sendChain(socket));
    }
}

module.exports = P2pserver;
