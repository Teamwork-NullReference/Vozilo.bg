/* globals module require */
'use strict';

const express = require('express');

module.exports = function({ app, data }) {
    let controller = require('../controllers/messages-controller')(data);

    let router = new express.Router();

    router.get('/:username/messages/:correspondenceId', controller.getCorrespondenceDetails);

    router.get('/:username/messages', controller.getLatestMessages);

    app.use('/user', router);

    return router;
};