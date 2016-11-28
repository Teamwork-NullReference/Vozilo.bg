/* globals module require */

const CarBrand = require('./car-brand-model'),
    CarBrandDetail = require('./car-brand-detail-model');

module.exports = {
    getCarBrand(brand, url, logoUrl) {
        return CarBrand.getCarBrand(brand, url, logoUrl);
    },
    getCarBrandDetail(brand, logoUrl, models) {
        return CarBrandDetail.getCarBrandDetail(brand, logoUrl, models);
    },
    insertManyCarBrands(carBrands) {
        CarBrand.insertMany(carBrands);
    },
    insertManyCarBrandDetail(carBrands) {
        CarBrandDetail.insertMany(carBrands);
    },
    getAllCarBrands() {
        return CarBrand.find({});
    },
    getAllCarBrandsDetails() {
        return CarBrandDetail.find({});
    }
};