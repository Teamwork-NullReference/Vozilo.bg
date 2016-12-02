/* globals module require */
'use strict';

const express = require('express');
// const passport = require('passport');

module.exports = function ({ app, data }) {
    let searchController = require('../controllers/search-controller')(data);

    let searchRouter = new express.Router();
    searchRouter
        .get('/car', searchController.getCarSearch)
        .get('/car/:page', searchController.getCarSearch);

    app.use('/search', searchRouter);

    return searchRouter;
};