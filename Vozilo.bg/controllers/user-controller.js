/* globals module */
'use strict';

module.exports = function(data) {
    return {
        getDetailedUser(req, res) {
            let id = req.params.id;
            data.getUserById(id)
                .then(user => {
                    if (user === null) {
                        return res.render('user-not-found', {
                            result: {
                                user: req.user
                            }
                        });
                    }

                    res.render('user-details', {
                        result: {
                            user: req.user
                        }
                    });
                });
        }
    };
};