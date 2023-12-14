const express = require('express');
const app = express();
const http = require('http');

const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected')

    io.emit('connection', 'a new user connected'); // " 'connection' is the name of the event."
    socket.emit("welcome", "welcome new user");
    socket.broadcast.emit("new user", "a new client has connected to the server");

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
        io.emit('disconnection', 'a user disconnected');
    });
});



server.listen(3000, () => {
    console.log('listening on *:3000');
});