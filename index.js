const app = require('express')();
const path = require('path');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const _ = require('lodash');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const socketInterface = require('./server/controllers/socket-interface');
const helper = require('./helper.js');

// Parse body
app.use(bodyParser.json());

// Use native promise
mongoose.Promise = global.Promise;
const dbUri = process.env.DB_URI || 'mongodb://localhost:27017/socketio-chat';
const option =  {
    useMongoClient: true    
}

// Connect to database
const promise = mongoose.connect(dbUri, option)
    .then((db) => {
        console.log('Connected to database');
    })
    .catch((err) => {
        console.log(err);
    });

// Load models
require('./server/models');

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