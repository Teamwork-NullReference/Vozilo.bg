/* globals module */
'use strict';

let mockedUser = {
    firstName: 'Pesho',
    lastName: 'Petrov',
    username: '5ko',
    picture: 'http://sd.keepcalm-o-matic.co.uk/i/keep-calm-and-love-pesho-3.png',
    drivingExpInYears: '0',
    address: 'Somewhere else',
    email: 'PeshoPetkov@abv.bg',
    phoneNumber: '0888 123 123 88',
    cars: [],
    receivedReviews: [],
    userRating: 5,
    password: '123456',
    isDeleted: false
};

let mockedCar = {
    brand: 'brand',
    model: 'model',
    fuelType: 'Benzin',
    year: '2000',
    picture: 'http://icdn2.digitaltrends.com/image/nextev-ep9_-768x384-c.jpg',
    price: {
        perDay: 200,
        perHour: 300,
        perWeek: 400
    },
    shortInfo: 'ecwqecq wecwq ecqwecqw ecqwecwqecq ecwqecqweq'
};

for (let i = 0; i < 10; i += 1) {
    mockedUser.cars.push(mockedCar);
}

module.exports = function(data) {
    return {
        getDetailedUser(req, res) {
            let id = req.params.id;
            data.getUserById(id)
                .then(user => {
                    // TODO Remove mock before production
                    if (id === '1') {
                        return res.render('user-details', {
                            result: {
                                user: req.user,
                                userDetails: mockedUser
                            }
                        });
                    }
                    // Remove To here

                    if (user === null) {
                        return res.render('user-not-found', {
                            result: {
                                user: req.user
                            }
                        });
                    }

                    res.render('user-details', {
                        result: {
                            user: req.user,
                            userDetails: user
                        }
                    });
                });
        }
    };
};