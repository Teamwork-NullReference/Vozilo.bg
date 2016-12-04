/* globals require __dirname*/
'use strict';

const fs = require('fs');
const path = require('path');

module.exports = function({ data, hashGenerator, validator }) {

    let controllers = {};

    fs.readdirSync('./controllers')
        .filter(x => x.includes('-controller'))
        .forEach(file => {
            let controllerModule =
                require(path.join(__dirname, file))({ data, hashGenerator, validator });

            controllers[file.substring(0, file.indexOf('-'))] = controllerModule;
        });

    return controllers;
};