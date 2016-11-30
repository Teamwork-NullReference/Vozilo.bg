/* globals module require */

const crypto = require('crypto'),
    secret = require('./../config').cryptoSecret;

module.exports = function (password) {
    return crypto.createHmac('sha256', secret)
        .update(password)
        .digest('hex');

};