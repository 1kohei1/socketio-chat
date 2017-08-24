const _ = require('lodash');
const models = require('../models');
const util = require('./util.server.controller');
const globalController = require('./global.server.controller');

module.exports.createUser = (req, res) => {
    const apiInfo = {
        tag: 'CREATE_USER',
        logInfo: {
            body: req.body
        }
    };

    models.user.create(req.body)
    .then(user => {
        util.logSuccess(apiInfo);
        globalController.incrementNumOnineUsers();
        globalController.incrementNumUsers();

        res.json({
            success: true,
            data: {
                user
            }
        });
    })
    .catch(err => {
        util.logFailure(err, res, apiInfo);
    });
}

module.exports.onLogin = (req, res) => {

}