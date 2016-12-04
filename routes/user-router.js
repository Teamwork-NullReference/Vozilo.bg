/* globals module require */
'use strict';

const express = require('express');
// const passport = require('passport');

module.exports = function({ app, controllers }) {
    // Leave Commented until controllers/user-controller implemented!
    let controller = controllers.user;

    let router = new express.Router();

    router
    // .get('/', (req, res) => { // get all users with paging.
    //     res.send('It works!');
    // })
        .get('/filter/:pattern', controller.getFilteredUsernamesJson)
        .get('/rentals', controller.getRentalsInfo)
        .get('/:username', controller.getDetailedUser)
        .get('/:username/update', controller.getUpdateUserForm)
        .post('/:username/update', controller.updateUserInfo)
        .get('/:id/received', (req, res) => { // show all messages
            res.send('It works!');
        });
    // controller.getFilteredUsernamesJson
    // =======
    //         .get('/', (req, res) => { // get all users with paging.
    //             res.send('It works!');
    //         })
    //         .get('/:username', userController.getDetailedUser)
    //         .get('/:username/update', userController.getUpdateUserForm)
    //         .post('/:username/update', userController.updateUserInfo)
    //         .post('/:username/comments', userController.addComment);
    //     // .get('/:username/comments', userController.getComments)
    //     // .get('/:id/received', (req, res) => { // show all messages
    //     //     res.send('It works!');
    //     // });
    // >>>>>>> a0433a65c6daa8bb1d794c588aa677584035e84f
    // .get('/:id/reviews', (req, res) => {
    //     res.send('It works!');
    // });

    app.use('/user', router);

    return router;
};