const app = require('express')();
const path = require('path');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const _ = require('lodash');
const socketInterface = require('./server/controllers/socket-interface');
const helper = require('./helper.js');

// Set socket io to the file
socketInterface.setSocketIo(io);

// Setup routes
_.forEach(helper.getGlobbedFiles('./server/routes/*.js'), function(routePath) {
    require(path.resolve(routePath))(app);
});

// If other routes are requested, return the file in the client folder
app.get('*', (req, res) => {
    res.sendFile(__dirname + `/client/${req.originalUrl}`);
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
})