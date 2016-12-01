$().ready(function () {

    $("#signupForm").validate({
        rules: {
            firstname: {
                required: true
            },
            lastname: {
                required: true
            },
            username: {
                required: true,
                minlength: 2
            },
            password: {
                required: true,
                minlength: 6
            },
            confirm_password: {
                required: true,
                minlength: 5,
                equalTo: "#password"
            },
            email: {
                required: true,
                email: true
            },
            picture: {
                url: true
            },
            phoneNumber: {
                digits: true
            },
            experience: {
                range: [0, 60]
            }
            // city: {
            //     min: 3,
            //     max: 15
            // },
            // street: {
            //     min: 6,
            //     max: 50
            // }
        },
        messages: {
            lastname: "Моля въведете фамилия",
            username: {
                required: "Моля въведете потребителско име",
                minlength: "Вашето потребителско име трябва да бъде поне 2 символа"
            },
            password: {
                required: "Моля въведете парола",
                minlength: "Вашата парола трябва да бъде поне 6 символа"
            },
            confirm_password: {
                required: "Моля въведете парола",
                minlength: "Your password must be at least 5 characters long",
                equalTo: "Моля въведете паролата си повторно"
            },
            experience:"Шофьорският опит трябва да бъде по-голям от 1 година",
            email: "Моля въведете валиден имейл",
            picture: "Моля въведете валиден линк",
            phoneNumber: "Телефонният номер трябва да съдържа само цифри",
            city: {
                min: "Минималаната дължина на града е 3 символа",
                max: "Максималната дължина на града е 15"
            },
            street: {
                min: "Минималаната дължина на адреса е 3 символа",
                max: "Максималната дължина на адреса е 15"
            }
        }
    });
});