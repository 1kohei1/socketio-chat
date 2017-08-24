const models = require('../models');

module.exports.createUser = (req, res) => {
    const apiInfo = {
        tag: 'CREATE_USER',
        logInfo: {
            body: req.body
        }
    };

    res.json({
        'body': req.body
    });
}