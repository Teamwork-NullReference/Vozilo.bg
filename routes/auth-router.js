/* globals module require */
'use strict';

const express = require('express');
const passport = require('passport'),
    hashGenerator= require('./../utils/hashGenerator'),
    validator= require('./../utils/validator');

module.exports = function ({ app, data }) {

    let controller = require('../controllers/auth-controller')(data, hashGenerator, validator);

    let router = new express.Router();

    router
        .get('/sign-up', controller.getSignUpForm)
        .get('/sign-in', controller.getSignInForm)
        .get('/auth/google', controller.getSgnInGoogle)
        // .get('/login/github/callback', controller.getSgnInGoogle)
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
