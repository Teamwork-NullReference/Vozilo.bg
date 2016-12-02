/* globals module */
'use strict';

let validator = require('./validator');

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


function validate(carInfo) {
    if (!validator.validateNumberType(carInfo.perDay)) {
        return PRICE_PER_DAY_MUST_BE_A_NUMBER;
    } else if (!validator.validateNumberType(carInfo.perWeek || 1)) {
        return PRICE_PER_WEEK_MUST_BE_A_NUMBER;
    } else if (!validator.validateNumberType(carInfo.year)) {
        return YEAR_MUST_BE_A_NUMBER;
    } else if (!validator.validateNumberType(carInfo.distancePassed || 1)) {
        return DISTANCE_PASSED_NUMBER_MUST_BE_A_NUMBER;
    } else if (!validator.validateNumberType(carInfo.leastAge || 1)) {
        return LEAST_AGE_MUST_BE_A_NUMBER;
    } else if (!validator.validateNumberType(carInfo.drivingExperience || 1)) {
        return DRIVING_EXP_MUST_BE_A_NUMBER;
    } else if (!validator.validateNumberType(carInfo.minimumRentalPeriod || 1)) {
        return MIN_RENTAL_PERIOD_MUST_BE_A_NUMBER;
    } else if (!validator.validateDataType(carInfo.startDate)) {
        return START_DATE_MUST_BE_A_NUMBER;
    } else if (!validator.validateRequiredInfo(carInfo.brand)) {
        return BRAND_NOT_ENTERED;
    } else if (!validator.validateRequiredInfo(carInfo.model)) {
        return MODEL_NOT_ENTERED;
    } else if (!validator.validateRequiredInfo(carInfo.registrationNumber)) {
        return REGISTRATION_NUMBER_NOT_ENTERED;
    } else if (!validator.validateBooleanType(carInfo.smokingAllowed)) {
        return VALUE_MUST_BE_A_BOOLEAN_TYPE;
    } else if (!validator.validateBooleanType(carInfo.animalsAllowed)) {
        return VALUE_MUST_BE_A_BOOLEAN_TYPE;
    } else if (!validator.validateBooleanType(carInfo.electricWindows)) {
        return VALUE_MUST_BE_A_BOOLEAN_TYPE;
    } else if (!validator.validateBooleanType(carInfo.mp3Player)) {
        return VALUE_MUST_BE_A_BOOLEAN_TYPE;
    } else if (!validator.validateBooleanType(carInfo.winterTiers)) {
        return VALUE_MUST_BE_A_BOOLEAN_TYPE;
    } else if (!validator.validateBooleanType(carInfo.airCondition)) {
        return VALUE_MUST_BE_A_BOOLEAN_TYPE;
    } else if (!validator.validateBooleanType(carInfo.GPS)) {
        return VALUE_MUST_BE_A_BOOLEAN_TYPE;
    }

    return true;
}

module.exports = {
    validate
};