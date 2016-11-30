/* globals */
let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
function validatePassword(password) {
    let isCorrect=true;
    if (passwordRegex.test(password) || typeof str !== 'string') {
        isCorrect=false;
    }
    return isCorrect;
}

module.exports={ validatePassword };