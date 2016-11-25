/* globals module require */
'use strict';

const express = require('express');
// const passport = require('passport');

module.exports = function ({ app, data }) {
    let controller = require('../controllers/auth-controller')(data);

    let router = new express.Router();

    router
        .get('/register', (req, res) => {
            res.send('It works!');
        })
        .get('/login', (req, res) => {
            res.send('It works!');
        })
        .post('/register', (req, res) => {
            res.send('It works!');
        })
        // .post('/login',
        //     passport.authenticate('local', {
        //         failureRedirect: '/login'
        //     }),
        //     (req, res) => res.redirect('/'))
        .get('/logout', (req, res) => {
            res.send('It works!');
        });

    app.use('/', router);

    return router;
};