/* globals module require */
'use strict';

const express = require('express');
// const passport = require('passport');

module.exports = function ({
    app,
    data
}) {
    // Leave Commented until controllers/car-controller implemented!
    let controller = require('../controllers/car-controller')(data);

    let router = new express.Router();

    router
        .get('/', (req, res) => { // show all cars
            res.send('It works!');
        })
        .post('/create', controller.craeteCar)
        .get('/create', controller.loadCreateCarForm)
        .get('/:id', (req, res) => { // load car details
            res.send('It asdadasd!');
        })
        .get('/:id/update', (req, res) => { // load car-update view with current car data - not urgent 
        })
        .put('/:id/update', (req, res) => {
            res.send('It worksssss!');
        })
        // .put('/:id/delete', (req, res) => { // called from some button in the universe :)
        //     res.send('It works!');
        // })
        .get('/:id/rent', (req, res) => { // load car-rent view
            res.send('It workssssss!');
        })
        .post('/:id/rent', (req, res) => {
            res.send('It workssssssss!');
        });

    app.use('/car', router);

    return router;
};