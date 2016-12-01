
// function isAuthorized(req, res, next) {

//     let data = require('./../../data');
//     let check = true;
//     data.getUserByUsername(req.user.username)
//         .then(user => {
//             console.log(user);
//         });

//     if (check) {
//         // if (req.user.authenticated) {
//         return next();
//     }

//     res.redirect('/');
// }

// module.exports = isAuthorized;

module.exports = function(data) {
    return function isAuthorized(req, res, next) {

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