'use strict';
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
        function (request, accessToken, refreshToken, profile, done) {
            data
                .findByGoogleId(profile.id)
                .then(user => {
                    if (user) {
                        return user;
                    }
                    let googleUser= data.createUser({
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