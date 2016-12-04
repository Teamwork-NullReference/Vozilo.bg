/* globals module */
'use strict';
let dataUtils = require('./utils/data-utils');
let filterLimit = 10;
let userValidator = require('./validation/user-validator');

module.exports = function({
    models,
    validator
}) {
    let {
        User
    } = models;

    return {
        getAllUsers() {
            let promise = new Promise((resolve, reject) => {
                User.find({}, (err, res) => {
                    if (err) {
                        reject(err);
                    }

                    resolve(res);
                });
            });

            return promise;
        },
        getFilteredUsers(options) {
            let promise = new Promise((resolve, reject) => {
                User.find({
                    options
                }, (err, res) => {
                    if (err) {
                        reject(err);
                    }

                    resolve(res);
                });
            });

            return promise;
        },
        getUserById(id) {
            let promise = new Promise((resolve, reject) => {
                User.findOne({
                    _id: id
                }, (err, res) => {
                    if (err) {
                        reject(err);
                    }

                    resolve(res);
                });
            });

            return promise;
        },
        getUserByUsername(username) {
            let promise = new Promise((resolve, reject) => {
                User.findOne({
                    username
                }, (err, res) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(res);
                });
            });

            return promise;
        },
        createUser(user) {
            return userValidator.validate({
                user,
                validator
            })
                .then(() => {
                    return new Promise((resolve, reject) => {
                        let newUser = new User({
                            firstName: user.firstName,
                            lastName: user.lastName,
                            username: user.username,
                            googleId: user.googleId,
                            picture: user.picture,
                            drivingExpInYears: user.experience,
                            email: user.email,
                            phoneNumber: user.phoneNumber,
                            password: user.password
                        });
                        newUser.address.city = user.city;
                        newUser.address.street = user.street;
                        resolve(newUser);
                    });
                })
                .then((newUser) => {
                    return dataUtils.save(newUser);
                });
        },
        updateUser(user) {
            return new Promise((resolve, reject) => {
                user.save(err => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        },
        addCarToUser(user, car) {
            return this.getUserById(user._id)
                .then(u => {
                    u.cars.push({
                        brand: car.brand,
                        model: car.model,
                        carId: car._id,
                        year: car.year,
                        picture: car.picture,
                        _id: car._id
                    });

                    return dataUtils.update(u);
                });
        },
        getUsers({
            page,
            pageSize
        }) {
            let skip = (page - 1) * pageSize,
                limit = page * pageSize;

            return Promise.all([
                new Promise((resolve, reject) => {
                    User.find()
                        .sort({
                            name: 1
                        })
                        .skip(skip)
                        .limit(limit)
                        .exec((err, users) => {
                            if (err) {
                                return reject(err);
                            }

                            return resolve(users);
                        });
                }), new Promise((resolve, reject) => {
                    User.count({})
                        .exec((err, count) => {
                            if (err) {
                                return reject(err);
                            }

                            return resolve(count);
                        });
                })
            ]).then(results => {
                let [users, count] = results;
                return {
                    users,
                    count
                };
            });
        },
        findTopRated(n) {
            return new Promise((resolve, reject) => {
                User.find()
                    .sort({
                        userRating: -1
                    })
                    .limit(n)
                    .exec((err, users) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(users);
                    });
            });
        },
        filterUsers(filter, limit) {
            filterLimit = limit || filterLimit;
            return new Promise((resolve, reject) => {
                User.find()
                    .where({ 'username': { '$regex': filter, '$options': 'i' } })
                    .limit(filterLimit)
                    .exec((err, res) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(res);
                    });
            });
        },
        deleteUser(username) {
            return new Promise((resolve, reject) => {
                User.update({ username }, { isDeleted: true },
                    function(err, numberAffected, rawResponse) {
                        if (err) {
                            reject(err);
                        }
                        resolve(rawResponse);
                    });
            });
        },
        restoreUser(username) {
            return new Promise((resolve, reject) => {
                User.update({ username }, { isDeleted: false },
                    function(err, numberAffected, rawResponse) {
                        if (err) {
                            reject(err);
                        }
                        resolve(rawResponse);
                    });
            });
        }
    };
};