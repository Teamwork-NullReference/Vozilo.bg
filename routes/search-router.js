/* globals module require */
'use strict';

const express = require('express');
// const passport = require('passport');

module.exports = function ({ app, data }) {
    let searchController = require('../controllers/search-controller')(data);

    let searchRouter = new express.Router();
    searchRouter.get('/car', searchController.getCarSearch);

    app.use('/search', searchRouter);

    let searchApiRouter = new express.Router();
    searchApiRouter.get('/car/:page', searchController.getCarSearchJson);

    app.use('/api/search', searchApiRouter);

    return searchRouter;
};