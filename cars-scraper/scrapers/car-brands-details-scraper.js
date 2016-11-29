/* globals console require setTimeout Promise */
'use strict';

const httpRequester = require('../utils/http-requester');
const htmlParser = require('../utils/html-car-brand-details-parser');
const queuesFactory = require('../data-structures/queue');
const modelsFactory = require('../models');
const spanTimer = require('../utils/span-timer');

let urlsQueue = queuesFactory.getQueue();

let connectionsCounter = 0,
    carBrandsNamesInRAM = [];

function getCarBrandsDetailsFromUrl() {
    if (urlsQueue.isEmpty()) {
        return;
    }

    connectionsCounter += 1;
    const url = urlsQueue.pop();
    console.log(`Working with ${url}`);
    httpRequester.get(url)
        .then((result) => {
            const html = result.body;
            return htmlParser.parseCarBrandDetails(html);
        })
        .then(brand => {
            let carBrandDetail = modelsFactory.getCarBrandDetail(brand.brand, brand.logoUrl, brand.models);

            if (carBrandsNamesInRAM.indexOf(brand.brand) >= 0) {
                // console.log('Already exists in DB');
            } else {
                // console.log('Added in DB');
                carBrandsNamesInRAM.push(brand.brand);
            }

            modelsFactory.insertManyCarBrandDetail([carBrandDetail]);

            connectionsCounter -= 1;

            return spanTimer.wait(1000);
        })
        .then(() => {
            getCarBrandsDetailsFromUrl();
        })
        .catch((err) => {
            console.dir(err, { colors: true });

            connectionsCounter -= 1;
            urlsQueue.push(url);
            console.log(`\r\n${new Date().toLocaleString()}`);
            console.log(`2.1. queue length: ${urlsQueue.length}`);
            console.log(`2.1. connections: ${connectionsCounter}`);
            getCarBrandsDetailsFromUrl();
        });
}

const asyncPagesCount = 8;

module.exports.fillDatabaseWithCarBrandsDetails = function () {
    return new Promise((resolve) => {
        modelsFactory.getAllCarBrandsDetails()
            .then(brands => {
                brands.forEach(brand => {
                    carBrandsNamesInRAM.push(brand.brand);
                });

                return modelsFactory.getAllCarBrands();
            })
            .then((brands) => {
                console.log(`car brands count: ${brands.length}`);

                brands.forEach(brand => {
                    if (carBrandsNamesInRAM.indexOf(brand.brand) >= 0) {
                        return;
                    }

                    urlsQueue.push(brand.url);
                });

                console.log(`urlsQueue length: ${urlsQueue.length}`);

                return Promise.resolve();
            })
            .then(() => {
                Array.from({ length: asyncPagesCount })
                    .forEach(() => {
                        getCarBrandsDetailsFromUrl();
                    });

                function loop() {
                    // call a 10s setTimeout when the loop is called
                    setTimeout(() => {
                        console.log(`\r\n${new Date().toLocaleString()}`);
                        console.log(`2.2. queue length: ${urlsQueue.length}`);
                        console.log(`2.2. connections: ${connectionsCounter}`);

                        // if queue is not empty, call the loop function again which will trigger another setTimeout()
                        if (!urlsQueue.isEmpty() || connectionsCounter > 0) {
                            if (connectionsCounter === 0) {
                                Array.from({ length: asyncPagesCount })
                                    .forEach(() => {
                                        getCarBrandsDetailsFromUrl();
                                    });
                            }

                            loop();
                        } else {
                            console.log(`\r\n${new Date().toLocaleString()}`);
                            console.log('Task 2 finished.\r\n');
                            resolve();
                        }
                    }, 10000);
                }

                // start the loop
                loop();
            });
    });
};