var fs = require('fs');
const _ = require('lodash');

const models = {};

fs.readdirSync(__dirname)
    .filter(fileName => {
        return fileName.indexOf('server.model.js') > 0;
    })
    .forEach(fileName => {
        const modelName = _.first(fileName.split('.'));
        models[modelName] = require(`./${fileName}`);
    })

module.exports = models;