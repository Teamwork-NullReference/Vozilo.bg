/* globals console require Promise */
'use strict';

process.env.ENV_MODE = 'DEVELOPMENT';

const db = require('./config/mongoose'),
    carBrands = require('./scrapers/car-brands-scraper'),
    carBrandsDetails = require('./scrapers/car-brands-details-scraper'),
    timeMeasurement = require('./utils/time-measurement');

const startTime = Date.now();

let config = {};
if (process.env.ENV_MODE === 'PRODUCTION') {
    config.MONGOLAB_URI = process.env.MONGOLAB_URI;
} else {
    config.MONGOLAB_URI = require('./config/connection-strings').uri;
}

Promise.resolve()
    .then(() => {
        return db.open(config.MONGOLAB_URI);
    })
    .then(() => {
        console.log(`\r\n${new Date().toLocaleString()}`);
        console.log('IDBM scraping started.\r\n');

        return carBrands.fillDatabaseWithCarBrands();
    })
    .then(() => {
        console.log(timeMeasurement.getElapsedTime(Date.now() - startTime));

        return carBrandsDetails.fillDatabaseWithCarBrandsDetails();
    })
    .then(() => {
        db.close();
        console.log('DB closed.\r\n');
        console.log(new Date().toLocaleString());
        console.log('Cars scraping finished.\r\n');

        console.log(timeMeasurement.getElapsedTime(Date.now() - startTime));
    })
    .catch(error => {
        console.log(`Error: ${error}`);

        db.close();
        console.log('DB closed.\r\n');
    });