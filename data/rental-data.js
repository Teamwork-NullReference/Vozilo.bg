/* globals module require */
'use strict';

const dataUtils = require('./utils/data-utils');
module.exports = function ({
    models,
    validator
}) {
    let {
        Rental,
        Car
    } = models;

    const rentalValidator = require('./validation/rental-validator')(validator);

    return {
        getRentalById(rentalId) {
            return new Promise((resolve, reject) => {
                Rental.findOne({
                    '_id': rentalId
                }, (err, rental) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(rental);
                });
            });
        },
        getLastMessagesByUsername(username) {
            return new Promise((resolve, reject) => {
                Rental.find({
                    $or: [{
                        'carOwner.username': username
                    }, {
                        'renter.username': username
                    }]

                })
                .select('car carOwner renter messages')
                .exec((err, result) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(result);
                });
            });
        },
        addRental(rentalInfo) {
            return rentalValidator.validateMessage(rentalInfo.messageText)
                .then(() => {
                    return new Promise((resolve, reject) => {
                        Car.findById(rentalInfo.carId, (err, car) => {
                            if (err) {
                                return reject(err);
                            }

                            return resolve(car);
                        });
                    });
                })
                .then((car) => {
                    let {
                        startDate,
                        endDate,
                        messageText,
                        renterUserName,
                        renterImageUrl,
                        messageSender
                    } = rentalInfo,
                        carProjection = {
                            id: car._id,
                            brand: car.brand,
                            model: car.model
                        },
                        carOwner = {
                            username: car.owner.username,
                            imageUrl: car.owner.imageUrl
                        },
                        renter = {
                            username: renterUserName,
                            imageUrl: renterImageUrl
                        },
                        messages = [{
                            text: messageText,
                            date: new Date(),
                            sender: messageSender
                        }],
                        info = {
                            startDate,
                            endDate,
                            status: 'Pending'
                        };

                    let rental = new Rental({
                        car: carProjection,
                        carOwner,
                        renter,
                        messages,
                        rentalInfo: info
                    });

                    return dataUtils.save(rental);
                });
        },
        addMessageToRental(rentalId, message) {
            return rentalValidator.validateMessage(message.text)
                .then(() => {
                    return this.getRentalById(rentalId);
                })
                .then((rental) => {
                    rental.messages.push(message);

                    return dataUtils.save(rental);
                });
        },
        getRentalsByUsername(username) {
            return new Promise((resolve, reject) => {
                Rental.find({
                    $or: [{
                        'carOwner.username': username
                    }, {
                        'renter.username': username
                    }]

                })
                .select('car rentalInfo carOwner renter')
                .exec((err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(result);
                });
            });
        },
        changeRentalStatus(newStatus, carId, rentalId) {
            this.getRentalById(rentalId)
                .then(rental => {
                    if (newStatus === 'disapprove') { //const
                        rental.rentalInfo.status = newStatus;
                        return dataUtils.update(rental);
                    } else if (newStatus === 'approve') {

                    }
                });
        }
    };
};