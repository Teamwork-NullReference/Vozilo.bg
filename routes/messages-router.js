/* globals module require */
'use strict';

const express = require('express');

module.exports = function({ app, controllers }) {
    let controller = controllers.messages;

    let router = new express.Router();

    router.get('/:username/messages/:correspondenceId', controller.getCorrespondenceDetails);

    router.post('/:username/messages/:correspondenceId', controller.sendMessage);

    router.get('/:username/messages', controller.getLatestMessages);

    app.use('/user', router);

    return router;
};