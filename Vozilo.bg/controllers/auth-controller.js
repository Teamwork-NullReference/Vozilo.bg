/* globals module */

module.exports = function(data) {
    return {
        signUp(req, res) {
            let { username, password } = req.body;
            console.log(username+" "+password);
            data.createUser(username, password)
                .then(user => {
                    res.send({ success: true, message: 'You have been registered', user });
                    // res.redirect('/auth/sign-in');
                });
        },
        signOut(req, res) {
            req.logout();
            res.send({ success: true, message: 'You have been logout', user: req.body.user });
            //redirect('/');
        },
        getSignUpForm(req, res) {
            res.send()
            // res.render('authentication/sign-up');
        },
        getSignInForm(req, res) {
            return res.render('authentication/sign-in');
        }
    };
};