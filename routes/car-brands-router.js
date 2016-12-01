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
        .get('/carbrands', controller.getCarModels);

    app.use('/api', router);

    return router;
};