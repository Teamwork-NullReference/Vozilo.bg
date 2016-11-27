/* globals require module */

const modelRegistrator = require('./utils/model-registrator');
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// Minimum 8 characters at least 1 Alphabet and 1 Number.
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

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
    picture: String,
    drivingExpInYears: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: emailRegex
    },
    phoneNumber: {
        type: String,
        required: true
    },
    cars: [{}],
    receivedReviews: [{}],
    userRating: Number,
    password: {
        type: String,
        required: true,
        match: passwordRegex
    },
    isDeleted: Boolean
});