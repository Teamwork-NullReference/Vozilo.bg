/* globals module */
'use strict';

const START_YEAR = 1980;

module.exports = function (data) {
    return {
        loadCreateCarForm(req, res) {
            data.getAllBrands()
                .then(brands => {
                    let predefinedCars = brands;
                    return res.status(200)
                        .render('car/create-form', {
                            result: {
                                user: req.user,
                                predefinedCars,
                                endDate: new Date().getFullYear(),
                                startDate: START_YEAR
                            }
                        });
                })
                .catch(err => {
                    return res.status(500)
                        .send(err);
                });
        },
        craeteCar(req, res) {
            let user = req.user;
            let carInfo = req.body;
            return data.addCar(user, carInfo)
                .then(car => {
                    return data.addCarToUser(user, car);
                })
                .then(() => {
                    return res.status(201)
                        .redirect('/');
                })
                .catch(err => {
                    return res.status(400)
                        .send(err);
                });
        },
        loadCarDetails(req, res) {
            return data.getCarById(req.params.id)
                .then(carDetails => {
                    if (!carDetails) {
                        return res.status(404).send('There is not such car');
                    }
                    return res.status(200).render('car/details', {
                        result: {
                            user: req.user,
                            carDetails
                        }
                    });
                })
                .catch(err => {
                    return res.status(500).send(err);
                });
        },
        getCalendar(req, res) {
            data.getDatesFromCalendar(req.params.id)
                .then(dates => {
                    return res.send(dates);
                });
        }
    };
};