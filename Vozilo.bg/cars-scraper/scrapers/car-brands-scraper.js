/* globals console require setTimeout Promise */
'use strict';

const httpRequester = require('../utils/http-requester');
const htmlParser = require('../utils/html-car-brand-parser');
const queuesFactory = require('../data-structures/queue');
const modelsFactory = require('../models');
const constants = require('../config/constants');
const spanTimer = require('../utils/span-timer');

let urlsQueue,
    connectionsCounter = 0,
    carBrandsInRAM = [];

function getCarBrandsFromUrl() {
    if (urlsQueue.isEmpty()) {
        return;
    }

    connectionsCounter += 1;
    const url = urlsQueue.pop();
    console.log(`Working with ${url}`);
    httpRequester.get(url)
        .then((result) => {
            const html = result.body;
            return htmlParser.parseCarBrand(html);
        })
        .then(brands => {
            let dbCarBrands = brands.map(brand => {
                return modelsFactory.getCarBrand(brand.brand, brand.url, brand.logoUrl);
            });

            let carBrandsBatchToInsertInDb = [];

            dbCarBrands.forEach(brand => {
                if (carBrandsInRAM.indexOf(brand.brand) >= 0) {
                    // console.log('Already exists in DB');
                } else {
                    // console.log('Added in DB');
                    carBrandsInRAM.push(brand.brand);
                    carBrandsBatchToInsertInDb.push(brand);
                }
            });

            if (carBrandsBatchToInsertInDb.length > 0) {
                modelsFactory.insertManyCarBrands(carBrandsBatchToInsertInDb);
            }

            connectionsCounter -= 1;

            return spanTimer.wait(1000);
        })
        .then(() => {
            getCarBrandsFromUrl();
        })
        .catch((err) => {
            console.dir(err, { colors: true });

            connectionsCounter -= 1;
            urlsQueue.push(url);
            console.log(`\r\n${new Date().toLocaleString()}`);
            console.log(`1.1. queue length: ${urlsQueue.length}`);
            console.log(`1.1. connections: ${connectionsCounter}`);
            getCarBrandsFromUrl();
        });
}

module.exports.fillDatabaseWithCarBrands = function () {
    return new Promise((resolve, reject) => {
        Promise.resolve()
            .then(() => {
                urlsQueue = queuesFactory.getQueue();
                urlsQueue.push(constants.carBrandsUrl);

                return modelsFactory.getAllCarBrands();
            })
            .then(brands => {
                brands.forEach(brand => {
                    carBrandsInRAM.push(brand.brand);
                });
            })
            .then(() => {
                getCarBrandsFromUrl();

                function loop() {
                    // call a 5s setTimeout when the loop is called
                    setTimeout(() => {
                        console.log(`\r\n${new Date().toLocaleString()}`);
                        console.log(`1.2. queue length: ${urlsQueue.length}`);
                        console.log(`1.2. connections: ${connectionsCounter}`);

                        // if queue is not empty, call the loop function again which will trigger another setTimeout()
                        if (!urlsQueue.isEmpty() || connectionsCounter > 0) {
                            if (connectionsCounter === 0) {
                                getCarBrandsFromUrl();
                            }

                            loop();
                        } else {
                            console.log(`\r\n${new Date().toLocaleString()}`);
                            console.log('Task 1 finished.\r\n');
                            resolve();
                        }
                    }, 5000);
                }

                // start the loop
                loop();
            })
            .catch(() => {
                reject();
            });
    });
};