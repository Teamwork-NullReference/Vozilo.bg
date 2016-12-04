/* globals require module */

const mongoose = require('mongoose');
const modelRegistrator = require('./utils/model-registrator');
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

module.exports = modelRegistrator.register('User', {
    // TODO  update user-data.js, auth-controler and then uncomment
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
        unique: true
    },
    googleId: {
        type: String
    },
    picture: String,
    drivingExpInYears: {
        type: Number,
        min: 0,
        max: 60
    },
    address: {
        city: {
            type: String
        },
        street: {
            type: String
        }
    },
    email: {
        type: String,
        // required: true,
        unique: true,
        match: emailRegex
    },
    phoneNumber: {
        type: String
    },
    cars: [{}],
    receivedReviews: [{}],
    userRating: Number,
    password: {
        type: String
        // match: passwordRegex
    },
    correspondentions: [
        {
            id: mongoose.Schema.Types.ObjectId
        }
    ],
    rentalRequests: [{
        startRentalDate: {
            type: Date,
            required: true
        },
        endRentalDate: {
            type: Date,
            required: true
        },
        car: {
            id: String,
            imageUrl: String
        },
        owner: {
            username: String,
            imageUrl: String
        },
        status: {
            type: String,
            required: true,
            enum: ['Pending', 'Active', 'Canceled', 'Finished']
        },
        correspondentionId: mongoose.Schema.Types.ObjectId
    }],
    role: [String],
    isDeleted: Boolean
});