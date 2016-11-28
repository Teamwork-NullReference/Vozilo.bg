/* globals require module */

const modelRegistrator = require('./utils/model-registrator');

module.exports = modelRegistrator.register('Car', {
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Date,
        required: true
    },
    picture: String,
    registrationNumber: {
        type: String,
        required: true
    },
    hp: Number,
    fuelType: {
        type: String,
        required: true,
        enum: ['Diesel', 'Benzin', 'Electric', 'LPG']
    },
    fuelConsumption: String,
    seats: {
        type: Number,
        required: true
    },
    distancePassed: Number,
    shortInfo: String,
    price: {
        perDay: Number,
        perWeek: Number
    },
    availability: {
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        }
    },
    usageRequirements: {
        leastAge: {
            type: Number,
            default: 18
        },
        drivingExpirience: Number,
        smokingAllowed: Boolean,
        animalsAllowed: Boolean,
        minimumRentalPeriod: String
    },
    equipment: {
        aircondition: Boolean,
        GPS: Boolean,
        winterTiers: Boolean,
        mp3Player: Boolean,
        electricWindows: Boolean
    },
    history: [{
        startRentalDate: Date,
        endRentalDate: Date,
        renterUsername: String,
        givenRating: Number
    }],
    user: {
        username: String,
        imageUrl: String,
        firstName: String,
        lastName: String
    },
    isDeleted: Boolean
});