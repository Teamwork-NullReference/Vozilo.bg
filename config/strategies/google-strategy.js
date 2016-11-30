/* globals module */
'use strict';

// check if .OAuth2Strategy should be removed
const GoogleStrategy = require('passport-google-oauth20'),
    config = require('./../../config');

let CONFIG;
if (config.envMode === 'DEVELOPMENT') {
    CONFIG = require('./../configurationStrings').googleCredentials;
} else {
    CONFIG.clientID = process.env.GOOGLECREDENTIALS_CLIENT_ID;
    CONFIG.clientSecret = process.env.GOOGLECREDENTIALS_CLIENT_SECRET;
    CONFIG.callbackURL = process.env.GOOGLECREDENTIALS_CALLBACK_URL;
    CONFIG.profile = process.env.GOOGLECREDENTIALS_PROFILE;
}

module.exports = function (passport, data) {
    const authStrategy = new GoogleStrategy(
        {
            clientID: CONFIG.clientID,
            clientSecret: CONFIG.clientSecret,
            callbackURL: CONFIG.callbackURL,
            passReqToCallback: true
        },
        function (request, accessToken, refreshToken, profile, done) {
            data
                .findByGoogleId(profile.id)
                .then(user => {
                    if (user) {
                        return user;
                    }
                    let googleUser = data.createUser({
                        username: profile.displayName,
                        googleId: profile.id,
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                        picture: profile.photos[0].value,
                        email: profile.emails[0].value
                    });
                    return googleUser;
                })
                .then(user => {
                    done(null, user);
                })
                .catch(error => done(error, false));
        });

    passport.use(authStrategy);
};