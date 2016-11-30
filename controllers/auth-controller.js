/* globals module */

const passport = require('passport'),
    crypto = require('crypto'),
    config = require('./../config');

let secret,
    profile;
if (config.envMode === 'DEVELOPMENT') {
    secret = config.cryptoSecret;
    profile = require('./../config/configurationStrings').googleCredentials.profile;
} else {
    secret = process.env.CRYPTO_SECRET;
    profile = process.env.GOOGLECREDENTIALS_PROFILE;
}

module.exports = function (data) {
    return {
        signUp(req, res) {
            let newUser = {};
            let propoerties = ['username', 'firstName', 'lastName', 'email', 'picture', 'phoneNumber', 'experience', 'city', 'street'];
            propoerties.forEach(property => {
                if (!property || property.length < 0) {
                    res.status(411).json(`Missing ${property}`);
                }
                newUser[property] = req.body[property];
            });
            const hash = crypto.createHmac('sha256', secret)
                .update(req.body.password)
                .digest('hex');
            newUser.password = hash;
            data.createUser(newUser)
                .then(
                () => {
                    res.redirect('/auth/sign-in');
                })
                .catch(error => {
                    console.log(error);
                    res.status(500).json(error);
                });
        },
        signOut(req, res) {
            req.logout();
            res.redirect('/');
        },
        getSignUpForm(req, res) {
            return res.render('authentication/sign-up', {
                result: { user: req.user }
            });
        },
        getSignInForm(req, res) {
            return res.render('authentication/sign-in', {
                result: { user: req.user }
            });
        },
        getSgnInGoogle(req, res, next) {
            const auth = passport.authenticate('google', { scope: profile }, (error, user) => {
                if (error) {
                    console.log('auth-controler error');
                    next(error);
                    return;
                }

                if (!user) {
                    res.redirect('/auth/sign-in');
                }

                req.login(user, error1 => {
                    if (error1) {
                        next(error1);
                        return;
                    }
                    console.log('auth-controler tuka sum');
                    res.redirect('/profile');
                });
            });
            // .catch(error => {
            //     console.log(error);
            //     res.status(500).json(error);
            // });

            auth(req, res, next);
        }
    };
};