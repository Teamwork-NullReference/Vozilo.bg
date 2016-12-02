/* globals module require */
'use strict';

const express = require('express');
// const passport = require('passport');

module.exports = function ({ app, data }) {
    // Leave Commented until controllers/message-controller implemented!
    let controller = require('../controllers/messages-controller')(data);

    let router = new express.Router();

    router
        // .get('/:username/messages', (req, res) => { // show all messages
        //     res.send('It works !');
        // });
        .get('/:username/messages', controller.getUserMessages);
    // .get('/', (req, res) => { // load message view
    //     res.send('It works!');
    // })
    // .post('/', (req, res) => { // send message
    //     res.send('It works!');
    // });

    app.use('/user', router);

    return router;
};