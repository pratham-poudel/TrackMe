const express = require('express');
const app= express();
const http = require('http');
const path = require('path');
const server = http.createServer(app);
const socketio = require('socket.io');
const io= socketio(server);
io.on('connection', (socket) => {
    console.log('User connected');  
    socket.on('sendLocation', (coords) => {
        io.emit('receiveLocation', {id: socket.id, ...coords});
    });
    socket.on('disconnect', () => {
        io.emit('removeLocation', {id: socket.id});
    });
});
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.render('index');
});
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
