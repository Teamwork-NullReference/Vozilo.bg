/* globals module */
'use strict';

const PAGE_SIZE = 3,
    DEFAULT_PAGE = 1;

function getCarsFieldsProjection(cars) {
    let result = cars.map(c => {
        return {
            _id: c._id,
            picture: c.picture,
            brand: c.brand,
            shortInfo: c.shortInfo,
            owner: {
                imageUrl: c.owner.imageUrl,
                firstName: c.owner.firstName,
                lastName: c.owner.lastName
            },
            price: {
                perDay: c.price.perDay,
                perWeek: c.price.perWeek
            }
        };
    });

    return result;
}

module.exports = function (data) {
    return {
        getCarSearch(req, res) {
            let { city, startDate, endDate } = req.query,
                page = DEFAULT_PAGE,
                pageSize = PAGE_SIZE;

            data.getFilteredCars({ city, startDate, endDate, page, pageSize })
                .then((cars) => {
                    return res.render('search/car', {
                        result: {
                            user: req.user,
                            cars: getCarsFieldsProjection(cars)
                        }
                    });
                });
        },
        getCarSearchJson(req, res) {
            let { city, startDate, endDate } = req.query,
                page = req.params.page,
                pageSize = PAGE_SIZE;

            data.getFilteredCars({ city, startDate, endDate, page, pageSize })
                .then((cars) => {
                    res.json({
                        result: {
                            cars: getCarsFieldsProjection(cars)
                        }
                    });
                });
        }
    };
};