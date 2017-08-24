const _ = require('lodash');
const models = require('../models');
const util = require('./util.server.controller');
const globalController = require('./global.server.controller');
const socketInterface = require('./socket-interface');

module.exports.getMessages = (req, res) => {
    const apiData = {};
    const apiInfo = {
        tag: 'GET_MESSAGE',
        logInfo: {
            page: req.query.page
        }
    };

    // Do not do pagination at this point.
    models.message.find()
    .sort({sent_at: 'desc'})
    .populate('sender')
    .then(messages => {
        util.logSuccess(apiInfo);
        res.json({
            success: true,
            data: {
                messages
            }
        });
    })
    .catch(err => {
        util.logFailure(err, res, apiInfo);
    });
}

module.exports.newMessage = (req, res) => {
    const apiData = {};
    const apiInfo = {
        tag: 'NEW_MESSAGE',
        logInfo: {
            body: req.body
        }
    };

    const message = req.body;
    message.num_read = globalController.getNumOnlineUsers();
    
    models.message.create(message)
    .then(message => {
        util.logSuccess(apiInfo);
        res.json({
            success: true,
            data: {}
        });

        apiData.message = message;
        return models.user.findById(message.sender);
    })
    .then(user => {
        apiData.message.sender = user;
        socketInterface.notify('new_message', apiData.message);
    })
}
