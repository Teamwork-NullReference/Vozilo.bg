/* globals module */
'use strict';

module.exports = function(validator) {
    return {
        validateCorrespondence() {
            return Promise.resolve(true);
        },
        validateMessage() {
            return Promise.resolve(true);
        }
    };
};