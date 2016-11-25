/* globals module require */
'use strict';

const express = require('express');
// const passport = require('passport');

module.exports = function ({ app, data }) {
    let controller = require('../controllers/search-controller')(data);

    let router = new express.Router();

    router
        .get('/search', (req, res) => {
            res.send('It works!');
        });

    app.use('/', router);

    return router;
};