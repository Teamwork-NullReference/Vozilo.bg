/* globals module require Promise */

module.exports = function({ models, validator }) {
    let { User } = models;

    return {
        findUserByCredentials(username, password) {
            return new Promise((resolve, reject) => {
                User.findOne({ username, password }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        },
        findUserById(id) {
            return new Promise((resolve, reject) => {
                User.findOne({ _id: id }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        },
        findByGoogleId(id) {
            return new Promise((resolve, reject) => {
                User.findOne({ googleId: id }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        }
    };
};