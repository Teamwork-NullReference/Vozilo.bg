/* globals module require */
'use strict';

const express = require('express');
// const passport = require('passport');

module.exports = function({ app, controllers }) {
    // Leave Commented until controllers/user-controller implemented!
    let controller = controllers.user;

    let router = new express.Router();

    router
        .get('/filter/:pattern', controller.getFilteredUsernamesJson)
        .get('/:username', controller.getDetailedUser)
        .get('/:username/rentals', controller.getRentalsInfo)
        .post('/:username/rentals', controller.updateRentalsInfo)
        .get('/:username/update', controller.getUpdateUserForm)
        .post('/:username/update', controller.updateUserInfo)
        .put('/:username/rating', controller.setRating)
        .post('/:username/comments', controller.addComment);

    app.use('/user', router);

    return router;
};