/* globals module */
'use strict';

const PRICE_PER_DAY_MUST_BE_A_NUMBER = 'Цената на ден трябва да е число!',
    PRICE_PER_WEEK_MUST_BE_A_NUMBER = 'Цената на седмица трябва да е число!',
    YEAR_MUST_BE_A_NUMBER = 'Годината на производство трябва да бъде число!',
    MIN_RENTAL_PERIOD_MUST_BE_A_NUMBER = 'Минималния период на наемане трябва да бъде число!',
    DRIVING_EXP_MUST_BE_A_NUMBER = 'Шофьорският опит трябва да бъде число!',
    LEAST_AGE_MUST_BE_A_NUMBER = 'Минималната възраст трябва да бъде число!',
    DISTANCE_PASSED_NUMBER_MUST_BE_A_NUMBER = 'Пробегът трябва да бъде число!',
    START_DATE_MUST_BE_A_NUMBER = 'Началната дата трябва да бъде число!',
    MODEL_NOT_ENTERED = 'Модел трябва не е въведен!',
    BRAND_NOT_ENTERED = 'Бранд трябва не е въведен!',
    REGISTRATION_NUMBER_NOT_ENTERED = 'Регистрационен номер не е въведен!',
    VALUE_MUST_BE_A_BOOLEAN_TYPE = 'Стойноста трябва да бъде вярно или грешно!';

function validate({
    carInfo,
    validator
}) {
    return new Promise((resolve, reject) => {
        let props = Object.keys(carInfo);
        for (let prop of props) {
            let value = carInfo[prop];
            if (value) {
                carInfo[prop] = validator.escapeProhibitedChars(value);
            }
        }

        if (!validator.validateNumberType(carInfo.perDay)) {
            reject(PRICE_PER_DAY_MUST_BE_A_NUMBER);
        } else if (!validator.validateNumberType(carInfo.perWeek || 1)) {
            reject(PRICE_PER_WEEK_MUST_BE_A_NUMBER);
        } else if (!validator.validateNumberType(carInfo.year)) {
            reject(YEAR_MUST_BE_A_NUMBER);
        } else if (!validator.validateNumberType(carInfo.distancePassed || 1)) {
            reject(DISTANCE_PASSED_NUMBER_MUST_BE_A_NUMBER);
        } else if (!validator.validateNumberType(carInfo.leastAge || 1)) {
            reject(LEAST_AGE_MUST_BE_A_NUMBER);
        } else if (!validator.validateNumberType(carInfo.drivingExperience || 1)) {
            reject(DRIVING_EXP_MUST_BE_A_NUMBER);
        } else if (!validator.validateNumberType(carInfo.minimumRentalPeriod || 1)) {
            reject(MIN_RENTAL_PERIOD_MUST_BE_A_NUMBER);
        } else if (!validator.validateDateType(carInfo.startDate)) {
            reject(START_DATE_MUST_BE_A_NUMBER);
        } else if (!validator.validateRequiredInfo(carInfo.brand)) {
            reject(BRAND_NOT_ENTERED);
        } else if (!validator.validateRequiredInfo(carInfo.model)) {
            reject(MODEL_NOT_ENTERED);
        } else if (!validator.validateRequiredInfo(carInfo.registrationNumber)) {
            reject(REGISTRATION_NUMBER_NOT_ENTERED);
        } else if (!validator.validateBooleanType(carInfo.smokingAllowed)) {
            reject(VALUE_MUST_BE_A_BOOLEAN_TYPE);
        } else if (!validator.validateBooleanType(carInfo.animalsAllowed)) {
            reject(VALUE_MUST_BE_A_BOOLEAN_TYPE);
        } else if (!validator.validateBooleanType(carInfo.electricWindows)) {
            reject(VALUE_MUST_BE_A_BOOLEAN_TYPE);
        } else if (!validator.validateBooleanType(carInfo.mp3Player)) {
            reject(VALUE_MUST_BE_A_BOOLEAN_TYPE);
        } else if (!validator.validateBooleanType(carInfo.winterTiers)) {
            reject(VALUE_MUST_BE_A_BOOLEAN_TYPE);
        } else if (!validator.validateBooleanType(carInfo.airCondition)) {
            reject(VALUE_MUST_BE_A_BOOLEAN_TYPE);
        } else if (!validator.validateBooleanType(carInfo.GPS)) {
            reject(VALUE_MUST_BE_A_BOOLEAN_TYPE);
        }

        resolve(carInfo);
    });
}

module.exports = {
    validate
};