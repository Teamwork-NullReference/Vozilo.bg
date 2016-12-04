/* globals module require */
'use strict';

const express = require('express');
const passport = require('passport');


module.exports = function({ app, controllers }) {

    let controller = controllers.auth;

    let router = new express.Router();

    router
        .get('/sign-up', controller.getSignUpForm)
        .get('/sign-in', controller.getSignInForm)
        .get('/auth/google', controller.getSgnInGoogle)
        .get('/auth/google/callback',
            passport.authenticate('google', { failureRedirect: '/login' }),
            (req, res) => {
                res.redirect('/');
            }
        )
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