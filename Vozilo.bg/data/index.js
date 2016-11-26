/* globals module require global __dirname */
'use strict';

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

module.exports = function(config) {
    mongoose.Promise = global.Promise;
    mongoose.connect(config.connectionString);

    let models = require('./../models');
    let data = {};

    fs.readdirSync('./data')
        .filter(x => x.includes('-data'))
        .forEach(file => {
            console.log(file);
            let dataModule =
                require(path.join(__dirname, file))(models);

            Object.keys(dataModule)
                .forEach(key => {
                    data[key] = dataModule[key];
                });
        });

    return data;
};