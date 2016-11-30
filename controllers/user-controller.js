/* globals module */
'use strict';

module.exports = function(data) {
    return {
        getDetailedUser(req, res) {
            let username = req.params.username;
            console.log(username);
            data.getUserByUsername(username)
                .then(user => {

                    if (user === null || typeof user === 'undefined') {
                        return res.render('profile/user-not-found', {
                            result: {
                                user: req.user
                            }
                        });
                    }

                    let isCurrentUser = false;

                    if (req.user && username === req.user.username) {
                        isCurrentUser = true;

                    }

                    res.render('profile/user-details', {
                        result: {
                            user: req.user,
                            userDetails: user,
                            isCurrentUser
                        }
                    });
                });
        }
    };
};