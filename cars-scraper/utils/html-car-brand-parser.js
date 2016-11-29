/* globals module require Promise */
'use strict';

let cheerio = require('cheerio');

module.exports.parseCarBrand = (html) => {
    let $ = cheerio.load(html),
        items = [];

    $('div.models > div.col-2 > a').each((index, item) => {
        const $item = $(item);

        items.push({
            brand: $item.attr('title'),
            url: $item.attr('href'),
            logoUrl: $item.find('img').attr('src')
        });
    });

    return Promise.resolve(items);
};