/* globals require module */

const mongoose = require('mongoose');
const modelRegistrator = require('./utils/model-registrator');

module.exports = modelRegistrator.register('Rental', {
    car: {
        id: mongoose.Schema.Types.ObjectId,
        brand: String,
        model: String
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
    ],
    rentalInfo: {
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        },
        givenRating: Number,
        status: {
            type: String,
            required: true,
            enum: ['Pending', 'Active', 'Canceled', 'Finished']
        }
    }
});