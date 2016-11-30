/* globals module require global __dirname process */
'use strict';

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

module.exports = function (config, connectionSettings) {
    mongoose.Promise = global.Promise;

    if (config.envMode === 'DEVELOPMENT') {
        process.env.MONGOLAB_URI = connectionSettings.connectionString;
    }

    mongoose.connect(process.env.MONGOLAB_URI);

    // let models = require('./../models'); // not working
    let User = require('../models/user-model');
    let Car = require('../models/car-model');
    let Review = require('../models/review-model');
    let CarBrandDetail = require('../models/car-brand-model');
    let models = {
        User,
        Car,
        Review,
        CarBrandDetail
    };

    let data = {};
    fs.readdirSync('./data')
        .filter(x => x.includes('-data'))
        .forEach(file => {
            let dataModule =
                require(path.join(__dirname, file))(models);
            Object.keys(dataModule)
                .forEach(key => {
                    data[key] = dataModule[key];
                });
        });

    return data;
};