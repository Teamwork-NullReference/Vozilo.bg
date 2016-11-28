/* globals require module */

const modelRegistrator = require('./utils/model-registrator');

module.exports = modelRegistrator.register('CarBrandDetail', {
    brand: {
        type: String
    },
    logoUrl: {
        type: String,
        required: true,
        unique: true
    },
    models: []
});