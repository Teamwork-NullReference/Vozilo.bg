/* globals module */
'use strict';

module.exports = function ({ data }) {
    return {
        getLatestMessages(req, res) {
            let username = req.params.username;
            data.getUserByUsername(username)
                .then(user => {

                    if (user === null || typeof user === 'undefined') {
                        return res.render('profile/user-not-found', {
                            result: {
                                user: req.user
                            }
                        });
                    }

                    let isAuthorizedUser = false;

                    if (req.user &&
                        req.user.role &&
                        (req.user.role.indexOf('admin') >= 0 || username === req.user.username)) {
                        isAuthorizedUser = true;
                    }

                    if (isAuthorizedUser) {
                        // TODO: get last messages of any correspondence, sorted by date
                        // return data.getFilteredCars({ city, startDate, endDate, page, pageSize })

                        return Promise.resolve({
                            result: {
                                user: req.user,
                                correspondences: [{
                                    id: '5843ef4e57b02e238cf56f32',
                                    sender: {
                                        firstName: 'Dwayne',
                                        lastName: 'Johnson',
                                        pictureUrl: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTkyNDQ3NzAxM15BMl5BanBnXkFtZTgwODIwMTQ0NTE@._V1_UX214_CR0,0,214,317_AL_.jpg',
                                        address: {
                                            city: 'София',
                                            street: 'Цариградско шосе 123'
                                        }
                                    },
                                    message: {
                                        text: 'Are you talking to me?',
                                        datetime: '30.12.2016 14:00'
                                    }
                                },
                                {
                                    id: '5843ef4e57b02e238cf56f32',
                                    sender: {
                                        firstName: 'Mad',
                                        lastName: 'Marks',
                                        pictureUrl: 'http://i.imgur.com/y7Hm9.jpg',
                                        address: {
                                            city: 'София',
                                            street: 'Цариградско шосе 100'
                                        }
                                    },
                                    message: {
                                        text: 'Ще наема колата за един месец. Каква ще е отстъпката?',
                                        datetime: '3.12.2016 15:00'
                                    }
                                }]
                            }
                        });
                    }

                    // user is unauthorized
                    res.status(401).render('unauthorized', {
                        result: {
                            user: req.user
                        }
                    });

                    return Promise.reject(`User: ${username} is unauthorized.`);
                })
                .then((latestCorrespondences) => {
                    res.status(200).render('correspondence/latests', latestCorrespondences);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        getCorrespondenceDetails(req, res) {
            let username = req.params.username;
            data.getUserByUsername(username)
                .then(user => {

                    if (user === null || typeof user === 'undefined') {
                        return res.render('profile/user-not-found', {
                            result: {
                                user: req.user
                            }
                        });
                    }

                    let isAuthorizedUser = false;

                    if (req.user &&
                        req.user.role &&
                        (req.user.role.indexOf('admin') >= 0 || username === req.user.username)) {
                        isAuthorizedUser = true;
                    }

                    if (isAuthorizedUser) {
                        const rentalId = req.params.correspondenceId;
                        return data.getRentalById(rentalId);
                    }

                    // user is unauthorized
                    res.status(401).render('unauthorized', {
                        result: {
                            user: req.user
                        }
                    });

                    return Promise.reject(`User: ${username} is unauthorized.`);
                })
                .then((correspondenceDetails) => {
                    res.status(200).render('correspondence/detailed-view', {
                        result: {
                            user: req.user,
                            car: correspondenceDetails.car,
                            carOwner: correspondenceDetails.carOwner,
                            renter: correspondenceDetails.renter,
                            messages: correspondenceDetails.messages
                        }
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };
};