/* globals module require */

const crypto = require('crypto');

let config = {};
if (process.env.ENV_MODE === 'PRODUCTION') {
    config.CRYPTO_SECRET = process.env.CRYPTO_SECRET;
} else {
    config.CRYPTO_SECRET = require('./config/configurationStrings').cryptoSecret;
}

let secret = config.CRYPTO_SECRET;

module.exports = function (password) {
    return crypto.createHmac('sha256', secret)
        .update(password)
        .digest('hex');

};