/* globals module */
'use strict';
const mapper = require('./../utils/mapper'),
    commonValidator = require('./validation/common-validator'),
    DATES_RESERVED = 'Колата е заета за избраните дати',
    STATUS_NOT_AVAILABLE = 'Not Available',
    IS_APPROVED = 'approve',
    STATUS_ACTIVE = 'Active',
    STATUS_CANCELED = 'Canceled',
    IS_DISAPPROVE = 'disapprove';

module.exports = function({
    data
}) {
    return {
        getDetailedUser(req, res) {
            let username = req.params.username;
            data.getUserByUsername(username)
                .then(user => {

                    if (user === null || typeof user === 'undefined' || user.isDeleted) {
                        return res.render('profile/user-not-found', {
                            result: {
                                user: req.user
                            }
                        });
                    }

                    let extraInfoAllowed = false;
                    let allowMessagesAndComment = false;
                    let isAdmin = false;

                    if (req.user) {
                        if (!(username === req.user.username)) {
                            allowMessagesAndComment = true;
                        }

                        if (req.user.role && req.user.role.indexOf('admin') >= 0) {
                            isAdmin = true;
                        }

                        if (username === req.user.username || isAdmin) {
                            extraInfoAllowed = true;
                        }
                    }

                    user.userRating = user.userRating || 0;

                    res.render('profile/user-details', {
                        result: {
                            user: req.user,
                            userDetails: user,
                            extraInfoAllowed,
                            allowMessagesAndComment,
                            isAdmin
                        }
                    });
                })
                .catch(() => {
                    return res.render('profile/user-not-found', {
                        result: {
                            user: req.user
                        }
                    });
                });
        },
        getUpdateUserForm(req, res) {
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

                    let updateAllowed = false;
                    let isAdmin = false;

                    if (req.user) {
                        if (req.user.role && req.user.role.indexOf('admin') >= 0) {
                            isAdmin = true;
                        }

                        if (username === req.user.username || isAdmin) {
                            updateAllowed = true;
                        }
                    }

                    if (updateAllowed) {
                        res.status(200).render('profile/user-update', {
                            result: {
                                user: req.user,
                                userForUpdate: user
                            }
                        });
                    } else {
                        res.status(401).render('unauthorized', {
                            result: {
                                user: req.user
                            }
                        });
                    }
                })
                .catch(() => {
                    return res.render('profile/user-not-found', {
                        result: {
                            user: req.user
                        }
                    });
                });
        },
        updateUserInfo(req, res) {
            let username = req.params.username;
            data.getUserByUsername(username)
                .then(user => {
                    let propoerties = ['firstName', 'lastName', 'email', 'picture', 'phoneNumber', 'drivingExpInYears', 'city', 'street'];
                    propoerties.forEach(property => {
                        if (property === 'city' || property === 'street') {
                            user.address[property] = req.body[property] || user.address[property];
                        } else {
                            user[property] = req.body[property] || user[property];
                        }
                    });

                    return data.updateUser(user);
                })
                .then(user => {
                    res.redirect('/user/' + user.username);
                })
                .catch(err => {
                    res.status(400).render('bad-request', {
                        result: {
                            err
                        }
                    });
                });
        },
        addComment(req, res) {
            let username = req.params.username;
            let content = req.body.content;

            if (!req.user) {
                return res.status(401).render('unauthorized');
            }

            let comment = {
                content,
                senderUsername: req.user.username
            };

            data.getUserByUsername(username)
                .then(user => {
                    if (!user.receivedReviews) {
                        user.receivedReviews = [];
                    }

                    user.receivedReviews.unshift(comment);
                    return data.updateUser(user);
                })
                .then(() => {
                    res.status(200).send(comment);
                })
                .catch(err => {
                    res.status(400).render('bad-request', {
                        result: {
                            err
                        }
                    });
                });
        },
        getFilteredUsernamesJson(req, res) {
            let filter = req.params.pattern;
            data.filterUsers(filter)
                .then(users => {
                    let usernames = users.map((user) => {
                        return mapper.map(user, 'username').username;
                    });
                    res.status(200)
                        .send(usernames);
                });
        },
        getRentalsInfo(req, res) {
            data.getRentalsByUsername(req.user.username)
                .then(rentals => {
                    return res.status(200).render('rentals', {
                        result: {
                            user: req.user,
                            rentals
                        }
                    });
                });
        },
        updateRentalsInfo(req, res) {
            let body = req.body.rentalInfo.split(','),
                status = body[0],
                carId = body[1],
                rentalId = body[2];
            let rentalDates = {};
            let carDates;
            let newStatus;

            if (status === IS_APPROVED) {
                data.getRentalDates(rentalId)
                    .then(dates => {
                        rentalDates = dates;
                        return data.getDatesFromCalendar(carId);
                    })
                    .then(dates => {
                        carDates = dates;
                        return commonValidator.validateDatesAvailability({
                            startDate: rentalDates.rentalInfo.startDate,
                            endDate: rentalDates.rentalInfo.endDate,
                            availability: carDates[0].availability
                        });

                    })
                    .then(() => {
                        return data.updateCarAvailability(carId, rentalDates.rentalInfo.startDate, rentalDates.rentalInfo.endDate);
                    })
                    .then(() => {
                        newStatus = STATUS_ACTIVE;
                        return data.changeRentalStatus(rentalId, newStatus);
                    })
                    .then(() => {
                        res.status(200).redirect(`/user/${req.user.username}/rentals`);
                    })
                    .catch(err => {
                        if (err === DATES_RESERVED) {
                            newStatus = STATUS_NOT_AVAILABLE;
                            data.changeRentalStatus(rentalId, newStatus)
                                .then(() => {
                                    res.status(200).redirect(`/user/${req.user.username}/rentals`);
                                });
                        } else {
                            res.status(400).render('bad-request', {
                                result: {
                                    err
                                }
                            });
                        }
                    });
            } else if (status === IS_DISAPPROVE) {
                newStatus = STATUS_CANCELED;
                data.changeRentalStatus(rentalId, newStatus)
                    .then(() => {
                        res.status(200).redirect(`/user/${req.user.username}/rentals`);
                    });
            }
        },
        setRating(req, res) {
            if (!req.user || req.user.role.indexOf('admin') < 0) {
                return res.status(401).render('unauthorized');
            }

            let username = req.params.username;
            let rating = req.body.rating;
            data.getUserByUsername(username)
                .then(user => {
                    user.userRating = rating;
                    return data.updateUser(user);
                })
                .then(() => {
                    res.status(200).send({
                        rating
                    });
                })
                .catch(err => {
                    res.status(400).send(err);
                });
        }
    };
};