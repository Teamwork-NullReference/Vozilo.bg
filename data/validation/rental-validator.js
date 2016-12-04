/* globals module */
'use strict';

module.exports = function (validator) {
    return {
        validateMessage() {
            return Promise.resolve(true);
        }
    };
};