const _ = require('lodash');

module.exports.logSuccess = (apiInfo) => {
    console.log(`[LOG_SUCCESS]: ${apiInfo.tag} info: ${JSON.stringify(apiInfo.logInfo)}`);
};

module.exports.logFailure = (err, res, apiInfo) => {
    console.log(`[LOG_FAILURE]: ${apiInfo.tag} info: ${JSON.stringify(apiInfo.logInfo)}`);

    let message = 'Something went wrong';
    if (typeof err === 'string') {
        message = err;
    } else if (typeof err === 'object') {
        if (err.message) {
            message = err.message;
        }
    }

    res.json({
        success: false,
        data: {
            message
        }
    });
}

module.exports.socketLog = (title, data) => {
    console.log(`[SOCKET_LOG] title: ${title} data: ${JSON.stringify(data)}`);
}