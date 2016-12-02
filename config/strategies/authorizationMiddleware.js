module.exports = function(data) {
    return function isAuthorized(req, res, next) {
        console.log(req.user);

        data.getUserByUsername(req.user.username)
            .then(user => {
                let role = user.role;

                if (role.indexOf('admin')>=0) {
                    return next();
                }

                res.redirect('/');
            });
    };
};