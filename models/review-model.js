/* globals require module */

const modelRegistrator = require('./utils/model-registrator');

module.exports = modelRegistrator.register('Review', {
    content: {
        type: String,
        required: true
    },
    fromUsername: {
        type: String,
        required: true
    },
    isDeleted: Boolean
});