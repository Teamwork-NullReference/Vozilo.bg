/* globals module */
'use strict';


module.exports = function(models) {
    let { User } = models;

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
                User.find({ options }, (err, res) => {
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
                User.findOne({ id }, (err, res) => {
                    if (err) {
                        reject(err);
                    }

                    resolve(res);
                });
            });

            return promise;
        },
        createUser(username, password) {
            
            console.log(username, password);
            //tuk gurmi!!!
            let newUser = new User({ username, password });
            return new Promise((resolve, reject) => {
                newUser.save(err => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(newUser);
                });
            });
         },

        /* TODO find out what kind of Credentials we use and add it to be more clear. */
        getUserByCredentials(options) {
            let promise = new Promise((resolve, reject) => {
                User.findOne({ options }, (err, res) => {
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
