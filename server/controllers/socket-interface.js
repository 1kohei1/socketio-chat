const util = require('./util.server.controller');

let io;

module.exports.setSocketIo = (io) => {
    this.io = io;
}

module.exports.notify = (title, data) => {
    util.socketLog(title, data);
    this.io.emit(title, data);
}