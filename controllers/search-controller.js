/* globals module require */
'use strict';

const mapper = require('../utils/mapper');

const PAGE_SIZE = 5,
    DEFAULT_PAGE = 1;

function getCarsFieldsProjection(cars) {
    let result = cars.map(c => {
        return mapper.map(
            c,
            '_id',
            'picture',
            'brand',
            'shortInfo',
            'owner',
            'price');
    });

    return result;
}

module.exports = function (data) {
    return {
        getCarSearch(req, res) {
            let { city, startDate, endDate } = req.query,
                page = req.params.page || DEFAULT_PAGE,
                pageSize = PAGE_SIZE;

            if (page < 1) {
                page = DEFAULT_PAGE;
            }

            data.getFilteredCars({ city, startDate, endDate, page, pageSize })
                .then((cars) => {
                    let startPage = Math.floor((page - 1) / PAGE_SIZE) * PAGE_SIZE + 1,
                        endPage = startPage + PAGE_SIZE;

                    return res.render('search/car', {
                        result: {
                            user: req.user,
                            cars: getCarsFieldsProjection(cars),
                            startPage,
                            endPage,
                            currentPage: page
                        }
                    });
                });
        }
    };
};