/* globals module require */

const crypto = require('crypto'),
    config = require('./../config');

let secret;
if (config.envMode === 'DEVELOPMENT') {
    secret = require('./../config/configurationStrings').cryptoSecret;
    console.log(secret);
} else {
    secret = process.env.CRYPTO_SECRET;
}

module.exports = function (password) {
    return crypto.createHmac('sha256', secret)
        .update(password)
        .digest('hex');

};
