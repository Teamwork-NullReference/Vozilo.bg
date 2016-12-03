/* globals require module */

const mongoose = require('mongoose');
const modelRegistrator = require('./utils/model-registrator');

module.exports = modelRegistrator.register('Correspondention', {
    car: {
        id: mongoose.Schema.Types.ObjectId,
        imageUrl: String
    },
    owner: {
        username: {
            type: String,
            required: true
        },
        imageUrl: String
    },
    messages: [
        {
            sender: {
                username: {
                    type: String,
                    required: true
                },
                imageUrl: String
            },
            receiver: {
                username: {
                    type: String,
                    required: true
                },
                imageUrl: String
            },
            text: String,
            date: Date
        }
    ]
});