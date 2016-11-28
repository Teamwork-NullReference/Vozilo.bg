/* globals module */
'use strict';

function getFakePredefinedCarsData() {
    return [{
        brand: 'Ford',
        models: ['Focus', 'Ka', 'Mustang']
    }, {
        brand: 'Peugeot',
        models: ['307', '405', '607']
    }, {
        brand: 'Opel',
        models: ['Vectra', 'Astra', 'Kadet', 'Corsa']
    }, {
        brand: 'Renaut',
        models: ['19', 'Megan']
    }, {
        brand: 'BMW',
        models: ['3 series', '5 series', 'X5', 'X6']
    }];
}

module.exports = function (data) {
    return {
        loadCreateCarForm(req, res) {
            // data.getPredifinedCars()

            let predefinedCars = getFakePredefinedCarsData();

            return res.render('car/createForm', {
                result: {
                    user: req.user,
                    predefinedCars
                }
            });
        },
        craeteCar(req, res) {
            let user = req.user;
            res.send('it works all the time');
            console.log(req.body);
            //  data.CreateNewCar()
        }

    };
};