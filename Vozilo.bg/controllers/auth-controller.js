/* globals module */
const passport = require('passport');
module.exports = function(data) {
    return {
        signUp(req, res) {
            let newUser={};
            let propoerties=['username', 'firstName', 'lastName', 'email', 'password', 'picture', 'phoneNumber', 'experience', 'city', 'street'];
            propoerties.forEach(property => {
                if (!property||property.length<0) {
                    res.status(411).json(`Missing ${property}`);
                }
                newUser[property] = req.body[property];
            });

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
        loginGoogle(req, res, next) {
            const auth = passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/plus.login' } (error, user) => {
                if (error) {
                    next(error);
                    return;
                }

                if (!user) {
                    res.json({
                        success: false,
                        message: 'Invalid name or password!'
                    });
                }

                req.login(user, error1 => {
                    if (error1) {
                        next(error1);
                        return;
                    }

                    res.redirect('/');
                });
            });

            auth(req, res, next);
        }
    };
};

