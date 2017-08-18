var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const socketInterface = require('./server/controllers/socket-interface');

// Set socket io to the file
socketInterface.setSocketIo(io);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/index.html');
});

app.get('/hello', (req, res) => {
    socketInterface.notify('chat message', 'This is emitted by API call');
    res.send(200);
})

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
})