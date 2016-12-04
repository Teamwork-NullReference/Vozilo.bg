/* globals module */
'use strict';

// check if .OAuth2Strategy should be removed
const GoogleStrategy = require('passport-google-oauth20');

let config = {};
if (process.env.ENV_MODE === 'PRODUCTION') {
    config.GOOGLECREDENTIALS_CLIENT_ID = process.env.GOOGLECREDENTIALS_CLIENT_ID;
    config.GOOGLECREDENTIALS_CLIENT_SECRET = process.env.GOOGLECREDENTIALS_CLIENT_SECRET;
    config.GOOGLECREDENTIALS_CALLBACK_URL = process.env.GOOGLECREDENTIALS_CALLBACK_URL;
} else {
    const googleCredentials = require('./../configurationStrings').googleCredentials;
    config.GOOGLECREDENTIALS_CLIENT_ID = googleCredentials.clientID;
    config.GOOGLECREDENTIALS_CLIENT_SECRET = googleCredentials.clientSecret;
    config.GOOGLECREDENTIALS_CALLBACK_URL = googleCredentials.callbackURL;
}

module.exports = function (passport, data) {
    const authStrategy = new GoogleStrategy(
        {
            clientID: config.GOOGLECREDENTIALS_CLIENT_ID,
            clientSecret: config.GOOGLECREDENTIALS_CLIENT_SECRET,
            callbackURL: config.GOOGLECREDENTIALS_CALLBACK_URL,
            passReqToCallback: true
        },
        function (request, accessToken, refreshToken, profile, done) {
            data
                .findByGoogleId(profile.id)
                .then(user => {
                    if (user && !user.isDeleted) {
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