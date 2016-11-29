/* globals console require Promise */
'use strict';

// comment this when deploy application
process.env.mode = 'DEVELOPMENT';

const db = require('./config/mongoose'),
    connectionStrings = require('./config/connection-strings'),
    carBrands = require('./scrapers/car-brands-scraper'),
    carBrandsDetails = require('./scrapers/car-brands-details-scraper'),
    timeMeasurement = require('./utils/time-measurement');

const startTime = Date.now();

Promise.resolve()
    .then(() => {
        if(process.env.mode === 'DEVELOPMENT') {
            process.env.MONGOLAB_URI = connectionStrings.uri;
        }

        return db.open(process.env.MONGOLAB_URI);
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