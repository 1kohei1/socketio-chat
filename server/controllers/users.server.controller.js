const _ = require('lodash');
const models = require('../models');
const util = require('./util.server.controller');

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

        res.json({
            success: true,
            user
        });
    })
    .catch(err => {
        util.logFailure(err, res, apiInfo);
    });
}