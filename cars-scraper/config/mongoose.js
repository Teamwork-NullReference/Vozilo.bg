/* globals require module */
'use strict';

const mongoose = require('mongoose');

// Use native promises: http://mongoosejs.com/docs/promises.html
mongoose.Promise = global.Promise;

const options = {
    server: {
        poolSize: 20,
        socketOptions: { keepalive: 1 }
    },
    promiseLibrary: global.Promise
};

module.exports.open = function(connectionString) {
    return new Promise((resolve, reject) => {
        mongoose.connect(connectionString, options, (err) => {
            if (err) {
                return reject(err);
            }

            resolve();
        });
    });
};

module.exports.close = function() {
    mongoose.connection.close();
};