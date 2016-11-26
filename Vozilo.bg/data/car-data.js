/* globals module */
'use strict';


module.exports = function(models) {
    let { car } = models;

    return {
        getAllCars() {
            let promise = new Promise((resolve, reject) => {
                car.find({}, (err, res) => {
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
                car.find({ options }, (err, res) => {
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
                car.findOne({ id }, (err, res) => {
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