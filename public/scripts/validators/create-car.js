/* globals $ */
'use strinct';

$().ready(function () {
    $('#car-creation-form').validate({
        rules: {
            brand: {
                required: true
            },
            model: {
                required: true
            },
            year: {
                required: true,
                digits: true
            },
            registrationNumber: {
                required: true,
                minlength: 6
            },
            hp: {
                digits: true
            },
            fuel: {
                required: true,
                equalTo: 'Бензин' || 'Дизел' || 'Газ' || 'Електричество'
            },
            distance: {
                digits: true
            },
            perDay: {
                required: true,
                digits: true,
                min: 0
            },
            perWeek: {
                digits: true,
                min: 0
            },
            age: {
                digits: true,
                min: 18
            },
            experience: {
                digits: true,
                min: 0
            },
            rentalPeriod: {
                digits: true,
                min: 1
            },
            startDate: {
                date: true,
                required: true
            },
            endDate: {
                date: true,
                required: true
            }
        },
        messages: {
            brand: 'Моля въведете бранд',
            model: 'Моля въведете модел',
            year: 'Моля въведете година на производство',
            registrationNumber: 'Моля въведене регистрационен номер с минимална дължина 6 символа',
            hp: 'Мощноста трябва да съдържа само цифри',
            fuel: 'Горивото трябва да бъде едно от следните Бензин, Дизел, Газ, Електричество',
            distance: 'Пробегът трябва да съдържа само цифри',
            perDay: 'Минималната цена на ден трябва да бъде положително число',
            perWeek: 'Минималната цена на седмица трябва да бъде положително число',
            age: 'Минималната възраст трябва да бъде над 18 год.',
            experience: 'Шофьорски стаж трябва да бъде положително число',
            rentalPeriod: 'Минимални дни на наемане трябва да бъде положително число',
            startDate: 'Начална и крайна дата трябва да бъдат въведени',
            endDate: 'Крайна дата трябва да бъде въведена'
        }
    });
});