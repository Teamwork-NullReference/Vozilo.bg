/* globals module */

module.exports = function(data) {
    return {
        signUp(req, res) {
            let newUser={};
            console.log(req.body);
            let propoerties=['username', 'firstName', 'lastName', 'email', 'password', 'picture', 'phoneNumber', 'experience', 'City', 'street'];
            propoerties.forEach(property => {
                if (!property||property.length<0) {
                    res.status(411).json(`Missing ${property}`);
                }
                newUser[property] = req.body[property];
            });
                
            data.createUser(newUser)
                .then(
                    user => {
                        res.send({ success: true, message: 'You have been registered', user });
        //             // res.redirect('/auth/sign-in');    
                    })
                    .catch(error => {
                        console.log(error);
                        res.status(500).json(error);
                    });
        },
        signOut(req, res) {
            req.logout();
            res.send({ success: true, message: 'You have been logout', user: req.body.user });
            //redirect('/');
        },
        getSignUpForm(req, res) {
            return res.render('authentication/sign-up', {
                result: { user: req.user }
            });
        },
        // home(req, res) {
        //     data.findTopRated(3)
        //         .then((users) => {
        //             return res.render('home/home', {
        //                 result: {
        //                     user: req.user,
        //                     topRatedUsers: users
        //                 }
        //             });
        //         });
        // },
        getSignInForm(req, res) {
            return res.render('authentication/sign-in');
        }
    };
};

