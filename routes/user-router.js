/* globals module require */
'use strict';

const express = require('express');
// const passport = require('passport');

module.exports = function({ app, data }) {
    // Leave Commented until controllers/user-controller implemented!
    let userController = require('../controllers/user-controller')(data);

    let router = new express.Router();

    router
        .get('/', (req, res) => { // get all users with paging.
            res.send('It works!');
        })
        .get('/:username', userController.getDetailedUser)
        .get('/:username/update', userController.getUpdateUserForm)
        .post('/:username/update', userController.updateUserInfo)
        .post('/:username/comments', userController.addComment);
    // .get('/:username/comments', userController.getComments)
    // .get('/:id/received', (req, res) => { // show all messages
    //     res.send('It works!');
    // });
    // .get('/:id/reviews', (req, res) => {
    //     res.send('It works!');
    // });

    app.use('/user', router);

    return router;
};