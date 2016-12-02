let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

function validatePassword(password) {
    let isCorrect = true;
    if (!passwordRegex.test(password) || typeof password !== 'string') {
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
    if (!+input) {
        return false;
    }

    return true;
}

function validateDataType(input) {
    if (!new Date(input)) {
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

module.exports = {
    validatePassword,
    validateRequiredInfo,
    validateNumberType,
    validateDataType,
    validateBooleanType
};