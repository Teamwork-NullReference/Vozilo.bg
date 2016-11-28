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
        type: Number,
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
        enum: ['Дизел', 'Бензин', 'Електричество', 'Газ']
    },
    fuelConsumption: String,
    seats: {
        type: Number,
        required: true
    },
    distancePassed: Number,
    shortInfo: String,
    price: {
        perDay: {
            type: Number,
            required: true
        },
        perWeek: Number
    },
    availability: [{
        date: Date,
        isAvailable: Boolean
    }],
    usageRequirements: {
        leastAge: {
            type: Number,
            default: 18
        },
        drivingExperience: Number,
        smokingAllowed: Boolean,
        animalsAllowed: Boolean,
        minimumRentalPeriod: Number
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
    owner: {
        username: String,
        imageUrl: String,
        userId: String
    },
    isDeleted: Boolean
});