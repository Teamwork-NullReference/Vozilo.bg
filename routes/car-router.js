/* globals module require */
'use strict';

const express = require('express');

module.exports = function ({
    app,
    controllers
}) {

    let controller = controllers.car;

    let router = new express.Router();

    router
        .get('/', (req, res) => {
            res.send('It works!');
        })
        .post('/create', controller.craeteCar)
        .get('/create', controller.loadCreateCarForm)
        .get('/:id', controller.loadCarDetails)
        .get('/:id/calendar', controller.getCalendar)
        .get('/:id/update', (req, res) => {
            res.send('It is time to update me');
        })
        .put('/:id/update', (req, res) => {
            res.send('update put!');
        })
        .get('/:id/rent', controller.loadRentCarForm)
        .post('/:id/rent', controller.rentCar);

    app.use('/car', router);

    return router;
};