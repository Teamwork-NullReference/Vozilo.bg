/* globals require module */

const modelRegistrator = require('./utils/model-registrator');

module.exports = modelRegistrator.register('Correspondention', {
    car: {
        id: String,
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