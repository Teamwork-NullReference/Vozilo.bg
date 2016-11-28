/* globals module require */
'use strict';

const express = require('express');
// const passport = require('passport');

module.exports = function ({ app, data }) {
    let searchController = require('../controllers/search-controller')(data);

    let router = new express.Router();

    router
        .get('/car', searchController.getCarSearch);

    app.use('/search', router);

    return router;
};