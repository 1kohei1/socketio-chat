const userController = require('../controllers/users.server.controller');

module.exports = function(app) {
    app.route('/api/users')
        .post(userController.createUser);
}