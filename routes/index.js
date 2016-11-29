/* globals require module __dirname*/
'use strict';

const fs = require('fs');
const path = require('path');

module.exports = function(app, data) {
    fs.readdirSync('./routes')
        .filter(x => x.includes('-router'))
        .forEach(file => {
            require(path.join(__dirname, file))(app, data);
        });
};