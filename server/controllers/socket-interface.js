let io;

module.exports.setSocketIo = (io) => {
    this.io = io;
}

module.exports.notify = (title, data) => {
    this.io.emit(title, data);
}