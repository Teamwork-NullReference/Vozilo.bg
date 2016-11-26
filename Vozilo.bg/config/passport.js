/* globals module, require */
/* use strict */

const passport= require('passport'),
    LocalStratey= require('passport-local');

module.exports= function ({ app, data }) {
    app.use(passport.initialize());
    app.use(passport.seesion());

    const Strategy = new LocalStratey((username, password, done) => {
        data.findUserByCredentials(username, password)
            .then(user => {
                if (user) {
                    return done(null, user);
                }

                return done(null, false);
            })
            .catch(error => done(error, null));
    });
    passport.use(Strategy);
    passport.serializeUser((user, done) => {
        if (user) {
            done(null, user.id);
        }
    });
    passport.deserializeUser((id, done) => {
        data.findUserById(id)
            .then(user => {
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            })
            .catch(error => done (error, false));
    });
};