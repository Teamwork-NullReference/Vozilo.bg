/* globals module require Promise */
'use strict';

let cheerio = require('cheerio');

module.exports.parseCarBrandDetails = (html) => {
    let $ = cheerio.load(html),
        $brand = $('section.models > div a > img.logo'),
        brandName = $brand.attr('title').trim(),
        $models = $('section.models div.col-4 > a'),
        items = [],
        regex = new RegExp(brandName, 'g');

    $models.each((index, item) => {
        const $item = $(item),
            $model = $item.attr('title')
                .replace(regex, '')
                .trim();

        items.push({
            model: $model,
            pictureUrl: $item.find('img').attr('src')
        });
    });

    return Promise.resolve({
        brand: brandName,
        logoUrl: $brand.attr('src'),
        models: items
    });
};