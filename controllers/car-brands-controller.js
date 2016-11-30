/* globals module */
'use strict';

module.exports = function (data) {
    return {
        getCarBrands(req, res) {
            data.getAllBrands()
                .then(brands => {
                    res.status(200)
                        .send(brands);
                })
                .catch(err => {
                    res.status(500)
                        .send(err);
                });
        }
    };
};