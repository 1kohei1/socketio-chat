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
    const apiData = {};
    const apiInfo = {
        tag: 'ON_LOGIN',
        logInfo: {
            user_id: req.params.user_id
        }
    }

    models.user.findOneAndUpdate({
        _id: req.params.user_id
    }, {
        is_online: true
    })
    .then(user => {
        util.logSuccess(apiInfo);
        res.json({
            success: true,
            data: {
                user
            }
        });
    })
    .catch(err => {
        util.logFailure(err, res, apiInfo);
    })
}

module.exports.onLogoff = (req, res) => {
    const apiData = {};
    const apiInfo = {
        tag: 'ON_LOGOFF',
        logInfo: {
            user_id: req.params.user_id
        }
    }

    models.user.findOneAndUpdate({
        _id: req.params.user_id
    }, {
        logoff_at: new Date(),
        is_online: false
    })
    .then(user => {
        util.logSuccess(apiInfo);
        res.json({
            success: true,
            data: {}
        });
    })
    .catch(err => {
        util.logFailure(err, res, apiInfo);
    })
}