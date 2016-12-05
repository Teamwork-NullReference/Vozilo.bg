/* globals module */

module.exports = function(data) {
    return function(req, res, next) {
        data.getUserByUsername(req.user.username)
            .then(user => {
                let role = user.role;

                if (role.indexOf('admin') >= 0) {
                    return next();
                }

                res.redirect('/');
            });
    };
};