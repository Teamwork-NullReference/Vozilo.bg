/* globals module */
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
        }
    };
};

