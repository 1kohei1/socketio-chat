const usersController = require('../controllers/users.server.controller');

module.exports = function(app) {
    app.route('/api/users')
        .post(usersController.createUser);

    app.route('/api/users/:user_id/on_login')
        .post(usersController.onLogin);

    app.route('/api/users/:user_id/on_logoff')
        .post(usersController.onLogoff);
}