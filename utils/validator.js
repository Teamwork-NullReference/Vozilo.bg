const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

function validatePassword(password) {
    let isCorrect = true;
    if (!PASSWORD_REGEX.test(password) || typeof password !== 'string') {
        isCorrect = false;
    }

    return isCorrect;
}

function validateRequiredInfo(input) {
    if (!input) {
        return false;
    }

    return true;
}

function validateNumberType(input) {
    if (input === '0') {
        return true;
    } else if (!Number(input)) {
        return false;
    }

    return true;
}

function validateDateType(input) {
    if (!new Date(input)) {
        return false;
    }

    return true;
}

function validateRegexMatch(input, regex) {
    if (!input.match(regex)) {
        return false;
    }

    return true;
}

function validateBooleanType(input) {
    if (!input === 'true' && !input === 'false') {
        return false;
    }

    return true;
}

function validateLength(input, min, max) {
    if (input.length < min || input.length > max) {
        return false;
    }

    return true;
}

function validateNumberRange(input, min, max) {
    if (input < min || input > max) {
        return false;
    }

    return true;
}

function escapeProhibitedChars(input) {
    return input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/'/g, '&quot;')
        .replace(/"/g, '&#039;')
        .replace(/\$/g, '&#36;');
}

module.exports = {
    validatePassword,
    validateRequiredInfo,
    validateNumberType,
    validateRegexMatch,
    validateDateType,
    validateBooleanType,
    validateLength,
    validateNumberRange,
    escapeProhibitedChars
};