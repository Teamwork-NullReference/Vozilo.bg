/* globals module require */
'use strict';

const express = require('express');
const passport = require('passport');

module.exports = function ({
    app,
    data
}) {

    let controller = require('../controllers/car-controller')(data);

    let router = new express.Router();

    router
        .get('/', (req, res) => { // show all cars
            res.send('It works!');
        })
        .post('/create', controller.craeteCar)
        .get('/create', controller.loadCreateCarForm)
        .get('/:id', controller.loadCarDetails)
        .get('/:id/calendar', controller.getCalendar)
        .get('/:id/update', (req, res) => { // load car-update view with current car data - not urgent 
        })
        .put('/:id/update', (req, res) => {
            res.send('update put!');
        })
        // .put('/:id/delete', (req, res) => { // called from some button in the universe :)
        //     res.send('It works!');
        // })
        .get('/:id/rent', controller.loadRentCarForm)
        .post('/:id/rent', (req, res) => {
            res.send('renting post!');
        });

    app.use('/car', router);

    return router;
};