/* globals module require Promise */
'use strict';

const request = require('request');

module.exports = {
    get(url) {
        let options = {
            uri: url,
            headers: {
                'Accept': 'text/html',
                'Connection': 'keep-alive',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:50.0) Gecko/20100101 Firefox/50.0'
            },
            timeout: 5000
        };

        return new Promise((resolve, reject) => {
            request.get(options, (err, response, body) => {
                if (err) {
                    return reject(err);
                }

                resolve({ response, body });
            });
        });
    }
};