/* globals module */
'use strict';

const FIRSTNAME_REQUIRED = 'Първо име е задължително',
    LASTNAME_REQUIRED = 'Фамилно име е задължително',
    USERNAME_REQUIRED = 'Потребителско име е задължително',
    USERNAME_LENGTH = 'Потребителско име трябва да бъде между 3 и 30 символа',
    USERNAME_MIN_LENGTH = 3,
    USERNAME_MAX_LENGTH = 30,
    EMAIL_DOES_NOT_MATCH = 'Имейлът трябва да спазва следния темплейт *****@***.***',
    DRIVING_EXP_MUST_BE_NUMBER = 'Шофьорски опит трябва да бъде число',
    DRIVING_EXP_RANGE = 'Шофьорски опит трябва да бъде между 0 и 60 години',
    DRIVING_EXP_MIN = 0,
    DRIVING_EXP_MAX = 60,
    EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function validate({
    user,
    validator
}) {
    return new Promise((resolve, reject) => {
        let props = Object.keys(user);
        for (let prop of props) {
            let value = user[prop];
            if (value) {
                user[prop] = validator.escapeProhibitedChars(value);
            }
        }

        if (!validator.validateRequiredInfo(user.firstName)) {
            reject(FIRSTNAME_REQUIRED);
        } else if (!validator.validateRequiredInfo(user.lastName)) {
            reject(LASTNAME_REQUIRED);
        } else if (!validator.validateRequiredInfo(user.username)) {
            reject(USERNAME_REQUIRED);
        } else if (!validator.validateLength(user.username, USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH)) {
            reject(USERNAME_LENGTH);
        } else if (!validator.validateRegexMatch(user.email, EMAIL_REGEX)) {
            reject(EMAIL_DOES_NOT_MATCH);
        } else if (!validator.validateNumberType(user.experience || 1)) {
            reject(DRIVING_EXP_MUST_BE_NUMBER);
        } else if (!validator.validateNumberRange(user.experience, DRIVING_EXP_MIN, DRIVING_EXP_MAX)) {
            reject(DRIVING_EXP_RANGE);
        }

        resolve(user);
    });
}

module.exports = {
    validate
};