/* globals module require */
'use strict';

const express = require('express');

module.exports = function({ app, controllers }) {
    let searchController = controllers.search;

    let searchRouter = new express.Router();
    searchRouter
        .get('/car', searchController.getCarSearch)
        .get('/car/:page', searchController.getCarSearch);

    app.use('/search', searchRouter);

    return searchRouter;
};