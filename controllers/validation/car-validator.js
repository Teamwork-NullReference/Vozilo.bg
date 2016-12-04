/* globals module */
'use strict';

const INVALID_USER_RENTAL = 'Колата не може да бъде наета от този потребител';
const commonValidator = require('./common-validator');

module.exports = {
    validateRental({ user, car, startDate, endDate }) {
        return new Promise((resolve, reject) => {
            if (car.owner.username === user.username) {
                return reject(INVALID_USER_RENTAL);
            }

            return resolve();
        })
            .then(() => {
                let availability = car.availability;
                return commonValidator.validateDatesAvailability({ startDate, endDate, availability });
            });
    }
};