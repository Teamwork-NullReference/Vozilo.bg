/* globals */
let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
function validatePassword(password) {
    return passwordRegex.test(password);
}

module.exports={ validatePassword };