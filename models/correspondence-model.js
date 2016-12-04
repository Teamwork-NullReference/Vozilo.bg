/* globals require module */

const mongoose = require('mongoose');
const modelRegistrator = require('./utils/model-registrator');

module.exports = modelRegistrator.register('Correspondention', {
    car: {
        id: mongoose.Schema.Types.ObjectId,
        imageUrl: String
    },
    carOwner: {
        username: {
            type: String,
            required: true
        },
        imageUrl: String
    },
    renter: {
        username: {
            type: String,
            required: true
        },
        imageUrl: String
    },
    messages: [
        {
            text: String,
            date: Date,
            sender: String
        }
    ]
});