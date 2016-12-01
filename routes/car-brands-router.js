/* globals module require */
'use strict';

const express = require('express');

module.exports = function ({
    app,
    data
}) {

    let controller = require('../controllers/car-brands-controller')(data);

    let router = new express.Router();

    router
        .get('/carbrands', controller.getCarBrands);

    app.use('/api', router);

    return router;
};