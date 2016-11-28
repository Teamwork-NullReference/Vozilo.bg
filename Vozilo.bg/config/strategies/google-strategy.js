'use strict';
//check if .OAuth2Strategy should be removed
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const CONFIG = require('./../config');

module.exports = function (passport, data) {
    const authStrategy = new GoogleStrategy(
        {
            config: CONFIG.GOOGLE.CLIENT_ID,
            clientSecret: CONFIG.GOOGLE.CLIENT_SECRET,
            callbackUrl: CONFIG.GOOGLE.callbackURL
        },
        function (accessToken, refreshToken, profile, done) {
            console.log(profile);
            data
                .findByGoogleId(profile.id)
                .then(user => {
                    if (user) {
                        return user;
                    }

                    return data.createUser({
                        username: profile.username,
                        googleId: profile.id
                    });
                })
                .then(user => {
                    done(null, user);
                })
                .catch(error => done(error, false));
        });

    passport.use(authStrategy);
};