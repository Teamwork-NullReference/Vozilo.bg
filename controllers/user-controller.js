/* globals module */
'use strict';

module.exports = function(data) {
    return {
        getDetailedUser(req, res) {
            let username = req.params.username;
            data.getUserByUsername(username)
                .then(user => {
                    if (user === null) {
                        return res.render('profile/user-not-found', {
                            result: {
                                user: req.user
                            }
                        });
                    }

                    res.render('profile/user-details', {
                        result: {
                            user: req.user,
                            userDetails: user
                        }
                    });
                });
        }
    };
};