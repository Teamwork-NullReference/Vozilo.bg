/* globals module */
'use strict';
let dataUtils = require('./utils/data-utils');

module.exports = function (models) {
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
        createUser(user) {
            let newUser = new User({
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                picture: user.picture,
                drivingExpInYears: user.experience,
                email: user.email,
                phoneNumber: user.phoneNumber,
                password: user.password
            });
            newUser.address.city = user.city;
            newUser.address.street = user.street;
            return new Promise((resolve, reject) => {
                newUser.save(err => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(newUser);
                });
            });
        },
        addCarToUser(user, car) {
            return this.getUserById(user._id)
                .then(u => {
                    u.cars.push({
                        brand: car.brand,
                        model: car.model,
                        carId: car._id
                    });

                    return dataUtils.update(u);
                });
        },
        /* TODO find out what kind of Credentials we use and add it to be more clear. */
        getUserByCredentials(options) {
            let promise = new Promise((resolve, reject) => {
                User.findOne({
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
        /*TODO IMPLEMENT ME */
        findTopRated(n) {
            return Promise.resolve()
                .then(() => []);
        }
    };
};