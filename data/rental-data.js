/* globals module require */
'use strict';

const dataUtils = require('./utils/data-utils');

module.exports = function ({ models, validator }) {
    let {
        Rental
    } = models;

    const rentalValidator = require('./validation/rental-validator')(validator);

    return {
        getRentalById(rentalId) {
            return new Promise((resolve, reject) => {
                Rental.find({ '_id': rentalId }, (err, rental) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(rental);
                });
            });
        },
        addRental(rentalInfo) {
            return rentalValidator.validateRental(rentalInfo)
                .then(() => {
                    let rental = new Rental(rentalInfo);

                    return dataUtils.save(rental);
                });
        },
        addMessageToRental(rentalId, message) {
            rentalValidator.validateMessage()
                .then(() => {
                    return this.getRentalById(rentalId);
                })
                .then((rental) => {
                    rental.messages.push(message);

                    return dataUtils.save(rental);
                });
        }
    };
};