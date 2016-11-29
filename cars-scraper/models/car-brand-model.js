/* globals require module */
'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let CarBrand;

let CarBrandSchema = new Schema({
    brand: {
        type: String,
        validate: {
            validator(value, callback) {
                CarBrand.find({ brand: value }, (err, carBrands) => {
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
    url: {
        type: String,
        required: true,
        unique: true
    },
    logoUrl: {
        type: String,
        required: true,
        unique: true
    }
});

CarBrandSchema.statics.getCarBrand =
    function (brand, url, logoUrl) {
        return new CarBrand({ brand, url, logoUrl });
    };

mongoose.model('CarBrand', CarBrandSchema);
CarBrand = mongoose.model('CarBrand');
module.exports = CarBrand;