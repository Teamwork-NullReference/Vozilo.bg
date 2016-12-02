/* globals module require */
'use strict';

const express = require('express');
// const passport = require('passport');

module.exports = function({ app, data }) {
    // Leave Commented until controllers/user-controller implemented!
    let controller = require('../controllers/user-controller')(data);

    let router = new express.Router();

    router
        .get('/', (req, res) => { // get all users with paging.
            res.send('It works!');
        })
        .get('/:username', controller.getDetailedUser)
        .get('/:username/update', controller.getUpdateUserForm)
        .post('/:username/update', controller.updateUserInfo)
        .get('/:id/received', (req, res) => { // show all messages
            res.send('It works!');
        });
    // .get('/:id/reviews', (req, res) => {
    //     res.send('It works!');
    // });

    app.use('/user', router);

    return router;
};