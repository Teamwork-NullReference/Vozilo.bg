/* globals module */
'use strict';


module.exports = function(models) {
    let { Car } = models;

    return {
        getAllCars() {
            let promise = new Promise((resolve, reject) => {
                Car.find({}, (err, res) => {
                    if (err) {
                        reject(err);
                    }

                    resolve(res);
                });
            });

            return promise;
        },
        getFilteredCars(options) {
            let promise = new Promise((resolve, reject) => {
                Car.find({ options }, (err, res) => {
                    if (err) {
                        reject(err);
                    }

                    resolve(res);
                });
            });

            return promise;
        },
        getCarById(id) {
            let promise = new Promise((resolve, reject) => {
                Car.findOne({ id }, (err, res) => {
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