/* globals module require */
'use strict';

const express = require('express');

module.exports = function({
    app,
    controllers
}) {

    let controller = controllers.carbrands;

    let router = new express.Router();

    router
        .get('/carbrands', controller.getCarModels);

    app.use('/api', router);

    return router;
};