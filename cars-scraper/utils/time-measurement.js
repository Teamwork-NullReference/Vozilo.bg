/* eslint no-extra-parens: { "nestedBinaryExpressions": false } */
'use strict';

module.exports.getElapsedTime = function(miliseconds) {
    const seconds = miliseconds / 1000;

    let days = Math.floor(seconds / 86400),
        hours = Math.floor((seconds - (days * 86400)) / 3600),
        minutes = Math.floor((seconds - (days * 86400) - (hours * 3600)) / 60),
        secs = Math.floor(seconds - (days * 86400) - (hours * 3600) - (minutes * 60));

    return `Elapsed time: ${days} Days ${hours} Hours ${minutes} Minutes ${secs} Seconds\r\n`;
};