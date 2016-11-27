/* globals module require */
'use strict';

const express = require('express');
const passport = require('passport');

module.exports = function ({ app, data }) {

    let controller = require('../controllers/auth-controller')(data);

    let router = new express.Router();

    router
        // .get('/register', (req, res) => {
        //     res.send('It works!');
        // })
        // .get('/login', (req, res) => {
        //     res.send('It works!');
        // })
        // .post('/register', (req, res) => {
        //     res.send('It works!');
        // })
        // // .post('/login',
        // //     passport.authenticate('local', {
        // //         failureRedirect: '/login'
        // //     }),
        // //     (req, res) => res.redirect('/'))
        // .get('/logout', (req, res) => {
        //     res.send('It works!');
        // });


        .get('/sign-up', controller.getSignUpForm)
        .get('/sign-in', controller.getSignInForm)
        .post('/sign-up', controller.signUp)
        .post('/sign-in',
            passport.authenticate('local', { failureRedirect: '/auth/sign-in' }),
            (req, res) => res.send({ success: true, message: 'You have been signed in' })
            
            )
            //res.redirect('/'))
        .post('/sign-out', controller.signOut);

    app.use('/auth', router);

    app.use('/', router);

    return router;
};
