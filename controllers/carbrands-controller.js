/* globals module */
'use strict';

module.exports = function({ data }) {
    return {
        getCarModels(req, res) {
            data.getModels(req.query.brand)
                .then(models => {
                    res.status(200)
                        .send(models);
                })
                .catch(err => {
                    res.status(500)
                        .send(err);
                });
        }
    };
};