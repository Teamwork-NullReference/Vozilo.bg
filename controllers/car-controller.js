/* globals module require */
'use strict';

const mapper = require('../utils/mapper');

const START_YEAR = 1980;
const MAX_DAYS_PER_MONTH = 31;
// function getLastDateOfMonth(currentDate) {
//     let date = currentDate,
//         y = date.getFullYear(),
//         m = date.getMonth();
//     return new Date(y, m, 0).getDate();
// }

function addRentalRequest({ data, user, startDate, endDate, carProjection, owner }) {
    let rentalRequestInfo = {
        startRentalDate: startDate,
        endRentalDate: endDate,
        car: carProjection,
        owner,
        status: 'Pending'
    };

    return data.addRentalRequest(user, rentalRequestInfo);
}

function createNewCorrespondence({ data, startDate, endDate, message, carId, user }) {
    let owner,
        sender,
        carProjection;

    return data.getCarById(carId)
        .then((car) => {
            carProjection = {
                id: car._id,
                imageUrl: car.picture
            };
            owner = {
                username: car.owner.username,
                imageUrl: car.owner.imageUrl
            };
            sender = {
                username: user.username,
                imageUrl: user.picture
            };
            let correspondenceInfo = {
                car: carProjection,
                owner,
                messages: {
                    sender,
                    receiver: owner,
                    text: message,
                    date: new Date()
                }
            };

            return data.addCorrespondence(correspondenceInfo, sender, owner);
        })
        .then(() => {
            return addRentalRequest({ data, user, startDate, endDate, carProjection, owner });
        });
}

// function addMessageToCorrespondence({ data, startDate, endDate, message, carId, user, correspondence }) {
//     return data.getCarById(carId)
//         .then((car) => {
//             let messageObj = {
//                 sender: user
//             };
//             data.addMessageToCorrespondence(messageObj, correspondence._id)
//                 .then((correspondence) => {
//                     addRentalRequest({ data, user, startDate, endDate, carProjection, owner })
//                         .then((res) => {
//                             if (!user.correspondences.contains(correspondence._id)) {
//                                 return data.addCorrespondenceToUser(user, correspondence._id);
//                             }

//                             return Promise.resolve(res);
//                         });
//                 });
//         });
// }

module.exports = function(data) {
    return {
        loadCreateCarForm(req, res) {
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
                    console.log('car controller');
                    return data.addCarToUser(user, car);
                })
                .then(() => {
                    return res.status(201)
                        .redirect('/');
                })
                .catch(err => {
                    console.log('controller catch');
                    return res.status(400)
                        .render('status-codes/status-code-error', {
                            result: {
                                code: 400,
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

                    return res.status(404).send('There is not such car');
                })
                .then(user => {
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

            //TODO redirect to error page when implemented
            return res
                .status(300)
                .redirect('/sign-in');
        },
        rentCar(req, res) {
            let user = req.user;
            if (user) {
                let { startDate, endDate, message, carId } = req.body;
                console.log('Here');
                data.getCorrespondenceByCarId(carId)
                    .then((correspondence) => {
                        if (correspondence.length) {
                            addMessageToCorrespondence({ startDate, endDate, message, carId })
                                .catch(err => {
                                    return res.status(400)
                                        .render('status-codes/status-code-error', {
                                            result: {
                                                code: 400,
                                                err
                                            }
                                        });
                                });
                        } else {
                            createNewCorrespondence({ data, startDate, endDate, message, carId, user, correspondence })
                                .catch(err => {
                                    console.log('controller catch');
                                    return res.status(400)
                                        .render('status-codes/status-code-error', {
                                            result: {
                                                code: 400,
                                                err
                                            }
                                        });
                                });
                        }
                    });
            }

            //TODO redirect to error page when implemented
            return res
                .status(300)
                .redirect('/sign-in');
        }
    };
};