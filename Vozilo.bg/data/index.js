/* globals module require global __dirname */
'use strict';

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

module.exports = function (config) {
    mongoose.Promise = global.Promise;
    mongoose.connect(config.connectionString);

    // let models = require('./../models'); // not working
    let User = require('../models/user-model');
    let Car = require('../models/car-model');
    let Review = require('../models/review-model');

    let models = {
        User,
        Car,
        Review
    };
                    picture: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRLF5OpEb0Ao98MRh3z5KJlISsLpJJuze0S7q4jwOTBfITlMUEbbA',
                    firstName: 'John',
                    lastName: 'Smith',
                    userRating: 3.75,
                    _id: 'asdad'
                },
                {
                    picture: 'https://www.ewb.ca/sites/default/files/styles/header_image/public/CatherineK.jpg?itok=Jc-64dWT',
                    firstName: 'Jeniffer',
                    lastName: 'Anderson',
                    userRating: 3,
                    _id: 'asdasd'
                },
                {
                    picture: 'http://newsite.ewb.ca/sites/default/files/styles/header_image/public/MarkBrown%20(1).jpg?itok=lrb1gOaZ',
                    firstName: 'John',
                    lastName: 'Doe',
                    userRating: 4.5,
                    _id: 'sadasd'
                }];
            });
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