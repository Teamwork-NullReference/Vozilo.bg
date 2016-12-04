/* globals module */
'use strict';

const MILISSECONDS_IN_DAY = 1000 * 60 * 60 * 24;
const DATES_RESERVED = 'Колата е заета за избраните дати';

module.exports = {
    validateDatesAvailability({ startDate, endDate, availability }) {
        return new Promise((resolve, reject) => {
            let availableDatesCount = availability
                .filter(a => a.isAvailable && (new Date(startDate) <= a.date && a.date <= new Date(endDate)))
                .length;

            let range = (new Date(endDate) - new Date(startDate)) / MILISSECONDS_IN_DAY + 1;

            if (range > availableDatesCount) {
                return reject(DATES_RESERVED);
            }

            return resolve();
        });
    }
};