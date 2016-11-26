/* globals module */
'use strict';


module.exports = function(models) {
    let { user } = models;

    return {
        getAllUsers() {
            let promise = new Promise((resolve, reject) => {
                user.find({}, (err, res) => {
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
                user.find({ options }, (err, res) => {
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
                user.findOne({ id }, (err, res) => {
                    if (err) {
                        reject(err);
                    }

                    resolve(res);
                });
            });

            return promise;
        },
        createUser(username, password) {
            //tuk gurmi!!!
            let newUser = new user({ username, password });
            return new Promise((resolve, reject) => {
                newUser.save(err => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
         },

        /* TODO find out what kind of Credentials we use and add it to be more clear. */
        getUserByCredentials(options) {
            let promise = new Promise((resolve, reject) => {
                user.findOne({ options }, (err, res) => {
                    if (err) {
                        reject(err);
                    }

                    resolve(res);
                });
            });

            return promise;
        }
    };
};
