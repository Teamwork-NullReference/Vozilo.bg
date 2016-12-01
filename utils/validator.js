let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
function validatePassword(password) {
    let isCorrect = true;
    if (!passwordRegex.test(password) || typeof password !== 'string') {
        isCorrect = false;
    }
    console.log(passwordRegex.test(password));

    return isCorrect;
}

module.exports = { validatePassword };