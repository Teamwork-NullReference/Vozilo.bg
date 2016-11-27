// /* globals require __dirname*/
// 'use strict';

// const fs = require('fs');
// const path = require('path');
// let models = {};

// module.exports = function() {
//     console.log('hui');
//     fs.readdirSync('../models')
//         .filter(x => x.includes('-model'))
//         .forEach(file => {
//             let ModelModule = require(path.join(__dirname, file));
//             models[file.substring(0, file.indexOf('-'))] = ModelModule;
//         });
//     return models;
// };
