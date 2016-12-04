/* globals module */
'use strict';

const MESSAGE_LENGTH = 'Съобщението трябва да бъде между 10 и 2000 символа',
    MESSAGE_MIN_LENGTH = 10,
    MESSAGE_MAX_LENGTH = 2000;

module.exports = function(validator) {
    return {
        validateRental() {
            return Promise.resolve(true);
        },
        validateMessage(message) {
            return new Promise((resolve, reject) => {
                let escapedMessage = validator.escapeProhibitedChars(message);

                if (!validator.validateLength(escapedMessage, MESSAGE_MIN_LENGTH, MESSAGE_MAX_LENGTH)) {
                    reject(MESSAGE_LENGTH);
                }

                resolve(message);
            });
        }
    };
};