/* globals module */
'use strict';

module.exports = function (data) {
    return {
        home(req, res) {
            data.findTopRated(3)
                .then((users) => {
                    return res.render('home/home', {
                        result: {
                            user: req.user,
                            topRatedUsers: users
                        }
                    });
                });
        }
    };
};