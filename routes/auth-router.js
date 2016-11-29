/* globals module require */
'use strict';

const express = require('express');
const passport = require('passport');

module.exports = function ({ app, data }) {

    let controller = require('../controllers/auth-controller')(data);

    let router = new express.Router();

    router
        .get('/sign-up', controller.getSignUpForm)
        .get('/sign-in', controller.getSignInForm)
        .post('/sign-up', controller.signUp)
        .post('/sign-in',
            passport.authenticate('local', { failureRedirect: '/auth/sign-in' }),
            (req, res) => res.redirect('/')
            )
        .post('/sign-out', controller.signOut);

    app.use('/auth', router);

    app.use('/', router);

    return router;
};
