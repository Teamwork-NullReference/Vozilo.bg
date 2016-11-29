/* globals module */
'use strict';

module.exports = function (models) {
    let {
        Car
    } = models;

    return {
        getAllCars() {
            let promise = new Promise((resolve, reject) => {
                Car.find({}, (err, res) => {
                    if (err) {
                        reject(err);
                    }

                    resolve(res);
                });
            });

            return promise;
        },
        getFilteredCars(options) {
            let promise = new Promise((resolve, reject) => {
                let city = options.city;
                let dates = [];
                let filter;
                if (city) {
                    filter = { 'owner.city': options.city };
                } else {
                    filter = {};
                }
                Car.find(filter, (err, res) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(res);
                });
                    // .then(cars => {
                    //     let { startDate, endDate } = options;
                    //     console.log(startDate);
                    //     if (startDate && endDate) {
                    //         // let availableCars = [];
                    //         // for (let i = 0; i < cars.length; i += 1) {
                    //         //     let car = cars[i];
                    //         //     for (let j = 0;)
                    //         // }

                    //         return resolve(availableCars);
                    //     }

                    //     return resolve(cars);
                    // });
            });

            return promise;
        },
        getCarById(id) {
            let promise = new Promise((resolve, reject) => {
                Car.findOne({
                    _id: id
                }, (err, res) => {
                    if (err) {
                        reject(err);
                    }

                    resolve(res);
                });
            });

            return promise;
        },
        addCar(user, carInfo) {
            let brand = carInfo.brand,
                model = carInfo.model,
                year = parseInt(carInfo.year, 10),
                registrationNumber = carInfo.registrationNumber,
                hp = parseInt(carInfo.hp, 10) || 0,
                fuelType = carInfo.fuelType,
                fuelConsumption = carInfo.fuelConsumption,
                seats = carInfo.seats,
                distancePassed = parseInt(carInfo.distancePassed, 10) || 0,
                shortInfo = carInfo.shortInfo,
                price = {
                    perDay: parseInt(carInfo.perDay, 10),
                    perWeek: parseInt(carInfo.perWeek, 10) || 0
                },
                usageRequirements = {
                    leastAge: parseInt(carInfo.leastAge, 10) || 18,
                    drivingExpirience: parseInt(carInfo.drivingExperience, 10) || 0,
                    smokingAllowed: carInfo.smokingAllowed,
                    animalsAllowed: carInfo.animalsAllowed,
                    minimumRentalPeriod: parseInt(carInfo.miniumRentalPeriod, 10) || 1
                },
                equipment = {
                    aircondition: carInfo.airCondition,
                    GPS: carInfo.GPS,
                    winterTiers: carInfo.winterTiers,
                    mp3Player: carInfo.mp3Player,
                    electricWindows: carInfo.electricWindows
                };

            let startDate = new Date(carInfo.startDate),
                endDate = new Date(carInfo.endDate),
                availability = [];

            for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
                availability.push({
                    date: new Date(d),
                    isAvailable: true
                });
            }

            let owner = {
                username: user.username,
                imageUrl: user.picture,
                userId: user._id
            };


            let promise = new Promise((resolve, reject) => {
                let newCar = new Car({
                    brand,
                    model,
                    year,
                    registrationNumber,
                    hp,
                    fuelType,
                    fuelConsumption,
                    seats,
                    distancePassed,
                    shortInfo,
                    price,
                    usageRequirements,
                    equipment,
                    availability,
                    owner
                });

                newCar.save(err => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(newCar);
                });
            });

            return promise;
        }
    };
};