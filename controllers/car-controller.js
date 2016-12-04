/* globals module require */
'use strict';

const mapper = require('../utils/mapper');
const carValidator = require('./validation/car-validator');

const START_YEAR = 1980;
const MAX_DAYS_PER_MONTH = 31;

module.exports = function ({
    data
}) {
    return {
        loadCreateCarForm(req, res) {
            if (!req.user) {
                return res.status(401).render('unauthorized', {
                    result: {
                        user: req.user
                    }
                });
            }

            data.getAllBrands()
                .then(brands => {
                    return res.status(200)
                        .render('car/create-form', {
                            result: {
                                user: req.user,
                                brands,
                                endDate: new Date().getFullYear(),
                                startDate: START_YEAR
                            }
                        });
                })
                .catch(err => {
                    res.status(500)
                        .send(err);
                });

        },
        craeteCar(req, res) {
            let user = req.user;
            let carInfo = req.body;
            data.addCar(user, carInfo)
                .then(car => {
                    return data.addCarToUser(user, car);
                })
                .then(() => {
                    return res.status(201)
                        .redirect('/');
                })
                .catch(err => {
                    return res.status(400)
                        .render('bad-request', {
                            result: {
                                err
                            }
                        });
                });
        },
        loadCarDetails(req, res) {
            let carDetails = {};
            data.getCarById(req.params.id)
                .then(car => {
                    if (car) {
                        carDetails = car;

                        return data.getUserByUsername(car.owner.username);
                    }

                    return Promise.resolve(null);
                })
                .then(user => {
                    if (!user) {
                        return res.status(404).send('There is not such car');
                    }

                    carDetails.owner.receivedReviews = user.receivedReviews;
                    return res.status(200).render('car/details', {
                        result: {
                            user: req.user,
                            carDetails
                        }
                    });
                })
                .catch(err => {
                    return res.status(500).send(err);
                });
        },
        getCalendar(req, res) {
            let year = parseInt(req.query.year, 10);
            let month = parseInt(req.query.month, 10);
            let startDate = new Date(`${year}-${month + 1}-1`);
            let endDate = new Date(`${year}-${month + 1}-${MAX_DAYS_PER_MONTH}`);

            data.getDatesFromCalendar(req.params.id, startDate, endDate)
                .then(dates => {
                    let result = dates[0].availability.filter(m => m.date <= endDate && m.date >= startDate && m.isAvailable === true)
                        .map(m => m.date);

                    return res.send(result);
                });
        },
        loadRentCarForm(req, res) {
            let user = req.user,
                carId = req.params.id;
            if (user) {
                return res
                    .status(200)
                    .render('car/rent-form', {
                        result: {
                            user: mapper.map(req.user, 'username', 'role', 'email', 'firstName', 'lastName'),
                            carId
                        }
                    });
            }

            return res
                .status(300)
                .redirect('/sign-in');
        },
        rentCar(req, res) {
            let user = req.user,
                { startDate, endDate, message, carId } = req.body,
                renterUserName = user.username,
                renterImageUrl = user.picture,
                messageText = message,
                messageSender = user.username;

            if (!user) {
                return res
                    .status(300)
                    .redirect('/sign-in');
            }

            return data.getCarById(carId)
                .then((car) => {
                    return carValidator.validateRental({ user, car, startDate, endDate });
                })
                .then(() => {
                    return data.addRental({
                        startDate,
                        endDate,
                        messageText,
                        carId,
                        renterUserName,
                        renterImageUrl,
                        messageSender
                    });
                })
                .then(() => {
                    return res.status(200).redirect('/');
                })
                .catch(err => {
                    return res.status(400)
                        .render('bad-request', {
                            result: {
                                err
                            }
                        });
                });
        }
    };
};