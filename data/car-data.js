/* globals module require */
'use strict';

let dataUtils = require('./utils/data-utils');
let carValidator = require('./validation/car-validator');

function getDatesFromRange(startDate, endDate) {
    let result = [];
    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        result.push(new Date(d));
    }

    return result;
}

module.exports = function ({
    models,
    validator
}) {
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
                let startDate = new Date(options.startDate),
                    endDate = new Date(options.endDate),
                    city = options.city,
                    page = options.page || 1,
                    pageSize = options.pageSize || 1000000000,
                    filterDates = getDatesFromRange(startDate, endDate),
                    andCriteria = [{}],
                    filter = {},
                    skip = (page - 1) * pageSize,
                    limit = page * pageSize;

                if (filterDates.length > 0) {
                    andCriteria.push({
                        'availability.date': {
                            '$all': filterDates
                        }
                    });
                    andCriteria.push({
                        'availability.isAvailable': true
                    });
                }

                if (city) {
                    andCriteria.push({
                        'owner.city': city
                    });
                }

                filter.$and = andCriteria;

                Car.find(filter)
                    .skip(skip)
                    .limit(limit)
                    .exec((err, res) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(res);
                    });
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
        getDatesFromCalendar(id) {
            let promise = new Promise((resolve, reject) => {
                Car.find({
                        _id: id
                    })
                    .select('availability')
                    .exec((err, dates) => {
                        if (err) {
                            reject(err);
                        }

                        resolve(dates);
                    });
            });

            return promise;
        },
        addCar(user, carInfo) {
            return carValidator.validate({
                    carInfo,
                    validator
                })
                .then(() => {
                    return new Promise((resolve, reject) => {
                        let brand = carInfo.brand,
                            model = carInfo.model,
                            year = parseInt(carInfo.year, 10),
                            registrationNumber = carInfo.registrationNumber,
                            hp = parseInt(carInfo.hp, 10) || 0,
                            fuelType = carInfo.fuelType,
                            picture = carInfo.picture,
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
                                smokingAllowed: carInfo.smokingAllowed || false,
                                animalsAllowed: carInfo.animalsAllowed || false,
                                minimumRentalPeriod: parseInt(carInfo.minimumRentalPeriod, 10) || 1
                            },
                            equipment = {
                                aircondition: carInfo.airCondition || false,
                                GPS: carInfo.GPS || false,
                                winterTiers: carInfo.winterTiers || false,
                                mp3Player: carInfo.mp3Player || false,
                                electricWindows: carInfo.electricWindows || false
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
                            userId: user._id,
                            city: user.address.city,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            userRating: user.userRating
                        };

                        let newCar = new Car({
                            brand,
                            model,
                            year,
                            registrationNumber,
                            hp,
                            fuelType,
                            picture,
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

                        resolve(newCar);
                    });
                })
                .then(newCar => {
                    return dataUtils.save(newCar);
                });
        },
        addRequest(car, requestInfo) {
            car.requests.push(requestInfo.id);

            return dataUtils.save(car);
        },
        updateCarAvailability(id, startDate, endDate) {
            return this.getCarById(id)
                .then(car => {
                    let datesToRemove = getDatesFromRange(startDate, endDate);
                    for (let date of car.availability) {
                        if (date.isAvailable) {
                            for (let removeDate of datesToRemove) {
                                if (date.date.toString() === removeDate.toString()) {
                                    date.isAvailable = false;
                                }
                            }
                        }
                    }

                    return dataUtils.update(car);
                });
        }
    };
};