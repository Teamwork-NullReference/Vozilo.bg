/* globals module require */

const crypto = require('crypto');

let config = {};
if (process.env.ENV_MODE === 'PRODUCTION') {
    config.CRYPTO_SECRET = process.env.CRYPTO_SECRET;
} else {
    config.CRYPTO_SECRET = require('./../config/configurationStrings').cryptoSecret;
}

module.exports = function (password) {
    return crypto.createHmac('sha256', config.CRYPTO_SECRET)
        .update(password)
        .digest('hex');

};