const messagesController = require('../controllers/messages.server.controller');

module.exports = function(app) {
    app.route('/api/messages')
        .post(messagesController.newMessage);
}