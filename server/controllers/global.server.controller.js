/**
 * This controller is for holding a variable across server.
 */
const models = require('../models');


let numOnlineUsers = null;
let numUsers = null;

if (numOnlineUsers == null) {
    models.user.count({is_online: true})
    .then(count => {
        numOnlineUsers = count;
    })
    .catch(err => {
        console.log(`[LOG_FAILURE] [GET_NUM_ONLINE_USERS] ${JSON.stringify(err)}`);
        numOnlineUsers = 0;
    });
}

if (numUsers == null) {
    models.user.count()
    .then(count => {
        numUsers = count;
    })
    .catch(err => {
        console.log(`[LOG_FAILURE] [GET_NUM_USERS] ${JSON.stringify(err)}`);
        numUsers = 0;
    });
}

module.exports.incrementNumOnlineUsers = () => {
    numOnlineUsers += 1;
}

module.exports.incrementNumUsers = () => {
    numUsers += 1;
}

module.exports.decrementNumOnlineUsers = () => {
    numOnlineUsers -= 1;
}

module.exports.decrementOnlineUsers = () => {
    numUsers -= 1;
}

module.exports.getNumOnlineUsers = () => {
    return numOnlineUsers;
}

module.exports.getNumUsers = () => {
    return numUsers;
}