/* globals module */
'use strict';
const mapper = require('./../utils/mapper');
const commonValidator = require('./validation/common-validator');
const DATES_RESERVED = 'Колата е заета за избраните дати';

module.exports = function ({
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

                    if (req.user) {
                        if (!(username === req.user.username)) {
                            allowMessagesAndComment = true;
                        }

                        if (username === req.user.username ||
                            (req.user.role && req.user.role.indexOf('admin') >= 0)) {
                            extraInfoAllowed = true;
                        }
                    }

                    user.userRating = user.userRating || 0;

                    res.render('profile/user-details', {
                        result: {
                            user: req.user,
                            userDetails: user,
                            extraInfoAllowed,
                            allowMessagesAndComment
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

                    if (req.user && ((req.user.role && req.user.role.indexOf('admin') >= 0) ||
                            username === req.user.username)) {
                        updateAllowed = true;
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
                    console.log(err);
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
                    console.log(err);
                    res.status(400).send(err);
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
                    // console.log('==================================================');
                    // console.log(rentals);
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

            if (status === 'approve') {
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
                        console.log('update car availability');
                        return data.updateCarAvailability(carId, rentalDates.rentalInfo.startDate, rentalDates.rentalInfo.endDate);
                    })
                    .then(() => {
                        newStatus = 'Active';
                        console.log('status change to Active');
                        return data.changeRentalStatus(rentalId, newStatus);
                    })
                    .then(() => {
                        res.status(200).redirect(`/user/${req.user.username}/rentals`);
                    })
                    .catch(err => {
                        if (err === DATES_RESERVED) {
                            console.log('not available');
                            newStatus = 'Not Available';
                            data.changeRentalStatus(rentalId, newStatus)
                                .then(() => {
                                    res.status(200).redirect(`/user/${req.user.username}/rentals`);
                                });
                        } else {
                            res.status(400).render('status-codes/status-code-error', {
                                result: {
                                    code: 400,
                                    err
                                }
                            });
                        }
                    });
            } else if (status === 'disapprove') {
                newStatus = 'Canceled';
                data.changeRentalStatus(rentalId, newStatus)
                    .then(() => {
                        res.status(200).redirect(`/user/${req.user.username}/rentals`);
                    });
            }
        }
    };
};
// check status name
// if approve
// get dates from rentals by rentalId
// get car availability dates by carId -> check its availability Dates
// if available -> 
//change them to notAvailable (update car availability)
// change status to Active - updateRentalStatus(id, status)
// else (not available)
// change status to not available - updateRentalStatus(id, status)
// else dissaprove
// change status to Canceled - updateRentalStatus(id, status)