/* globals module */
'use strict';

module.exports = function(validator) {
    return {
        validateRental() {
            return Promise.resolve(true);
        },
        validateMessage() {
            return Promise.resolve(true);
        }
    };
};