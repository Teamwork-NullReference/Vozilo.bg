'use strict';
//check if .OAuth2Strategy should be removed
const GoogleStrategy = require('passport-google-oauth20');
const CONFIG = require('./../configurationStrings').googleCredentials;

module.exports = function (passport, data) {
    const authStrategy = new GoogleStrategy(
        {
            clientID: CONFIG.clientID,
            clientSecret: CONFIG.clientSecret,
            callbackURL: CONFIG.callbackURL,
            passReqToCallback: true
        },
        function (accessToken, refreshToken, profile, done) {
            console.log(accessToken );
            console.log(refreshToken );
            console.log(profile);
            console.log(done);
            // data
            //     .findByGoogleId(profile.id)
            //     .then(user => {
            //         if (user) {
            //             return user;
            //         }

            //         return data.createUser({
            //             username: profile.username,
            //             googleId: profile.id
            //         });
            //     })
            //     .then(user => {
            //         done(null, user);
            //     })
            //     .catch(error => done(error, false));
        });

    passport.use(authStrategy);
};