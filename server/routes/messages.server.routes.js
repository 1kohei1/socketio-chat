const messagesController = require('../controllers/messages.server.controller');

module.exports = function(app) {
    app.route('/api/messages')
        .get(messagesController.getMessages)
        .post(messagesController.newMessage);
}