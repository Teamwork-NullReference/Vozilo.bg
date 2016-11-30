/* globals module require */

const crypto = require('crypto'),
    config = require('./../config'),
    secretString = require('./../config/configurationStrings');
let secret;
if (config.envMode === 'DEVELOPMENT') {
    secret = secretString.cryptoSecret;
} else {
    secret = process.env.CRYPTO_SECRET;
}

module.exports = function (password) {
    return crypto.createHmac('sha256', secret)
        .update(password)
        .digest('hex');

};