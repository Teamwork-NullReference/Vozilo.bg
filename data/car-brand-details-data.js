/* globals module */
'use strict';

module.exports = function (models) {
    let {
        CarBrandDetail
    } = models;

    return {
        getAllBrands() {
            return new Promise((resolve, reject) => {
                CarBrandDetail.find((err, res) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(res);
                });
            });
        }
    };
};