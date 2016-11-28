/* globals module */
'use strict';

module.exports = function (data) {
    return {
        loadCreateCarForm(req, res) {
            data.getAllBrands()
                .then(brands => {
                    let predefinedCars = brands;
                    return res.render('car/createForm', {
                        result: {
                            user: req.user,
                            predefinedCars
                        }
                    });
                });
        },
        craeteCar(req, res) {
            let user = req.user;
            res.send(user);
            console.log(req.user);
            //  data.CreateNewCar()
        }

    };
};