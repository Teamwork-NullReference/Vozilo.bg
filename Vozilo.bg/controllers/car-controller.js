/* globals module */
'use strict';

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
                                predefinedCars
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
                    // console.log(car);
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
        }
    };
};