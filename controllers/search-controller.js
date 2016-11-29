/* globals module */
'use strict';

module.exports = function (data) {
    return {
        getCarSearch(req, res) {
            let { city, startDate, endDate } = req.query;

            data.getFilteredCars({ city, startDate, endDate })
                .then((cars) => {
                    return res.render('search/car', {
                        result: {
                            user: req.user,
                            cars
                        }
                    });
                });
        }
    };
};