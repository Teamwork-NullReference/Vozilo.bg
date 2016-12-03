/* globals module */
'use strict';

module.exports = function(data) {
    return {
        getDetailedUser(req, res) {
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

                    let extraInfoAllowed = false;

                    if (req.user && ((req.user.role && req.user.role.indexOf('admin') >= 0) ||
                            username === req.user.username)) {
                        extraInfoAllowed = true;
                    }

                    user.userRating = user.userRating || 0;

                    res.render('profile/user-details', {
                        result: {
                            user: req.user,
                            userDetails: user,
                            extraInfoAllowed
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
                        user[property] = req.body[property] || user[property];
                    });

                    return data.updateUser(user);
                })
                .then(user => {
                    res.redirect('/user/' + user.username);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };
};