/* globals require module */
'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let CarBrandDetail;

let CarBrandDetailSchema = new Schema({
    brand: {
        type: String,
        validate: {
            validator(value, callback) {
                CarBrandDetail.find({ brand: value }, (err, carBrands) => {
                    if (err) {
                        console.log(err);
                        return callback(false);
                    }

                    callback(carBrands.length === 0);
                });
            },
            message: 'Car brand already exists!'
        },
        required: true,
        unique: true,
        index: true
    },
    logoUrl: {
        type: String,
        required: true,
        unique: true
    },
    models: []
});

CarBrandDetailSchema.statics.getCarBrandDetail =
    function (brand, logoUrl, models) {
        return new CarBrandDetail({ brand, logoUrl, models });
    };

mongoose.model('CarBrandDetail', CarBrandDetailSchema);
CarBrandDetail = mongoose.model('CarBrandDetail');
module.exports = CarBrandDetail;