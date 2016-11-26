/* globals module require */
'use strict';

const express = require('express');
// const passport = require('passport');

module.exports = function ({
    app,
    data
}) {
    // Leave Commented until controllers/car-controller implemented!
    // let controller = require('../controllers/car-controller')(data);

    let router = new express.Router();

    router
        .get('/', (req, res) => { // show all cars
            res.send('It works!');
        })
        .get('/:id', (req, res) => { // load car details
            res.send('It works!');
        })
        .get('/create', (req, res) => { // load car-create view
            res.send('It works!');
        })
        .post('/create', (req, res) => {
            res.send('It works!');
        })
        .get('/:id/update', (req, res) => { // load car-update view with current car data - not urgent 
            res.send('It works!');
        })
        .put('/:id/update', (req, res) => {
            res.send('It works!');
        })
        // .put('/:id/delete', (req, res) => { // called from some button in the universe :)
        //     res.send('It works!');
        // })
        .get('/:id/rent', (req, res) => { // load car-rent view
            res.send('It works!');
        })
        .post('/:id/rent', (req, res) => {
            res.send('It works!');
        });

    app.use('/car', router);

    return router;
};