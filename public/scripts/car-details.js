/* globals $ */

$(function () {
    var WEEK_DAYS = 7;

    var pricePerDay = $('#price-per-day').html(),
        pricePerWeek = $('#price-per-week').html(),
        startDate = new Date($('#start-date').val()),
        endDate = new Date($('#end-date').val());

    function countDates(start, end) {
        var oneDay = 24 * 60 * 60 * 1000,
            days = Math.round((end.getTime() - start.getTime()) / oneDay) + 1,
            sum,
            weeks,
            restDays;

        if (days > 0) {
            if (days === WEEK_DAYS && pricePerWeek) {
                sum = pricePerWeek;
            } else if (days > WEEK_DAYS && pricePerWeek) {
                weeks = Math.floor(days / WEEK_DAYS);
                restDays = days - weeks * WEEK_DAYS;
                sum = restDays * parseInt(pricePerDay, 10) + weeks * parseInt(pricePerWeek, 10);
            } else {
                sum = days * parseInt(pricePerDay, 10);
            }

            $('#total-sum').text(sum + ' лв');
        } else {
            $('#total-sum').text('0 лв');
        }
    }

    countDates(startDate, endDate);

    $('#start-date').on('change', function () {
        startDate = new Date($('#start-date').val());
        countDates(startDate, endDate);
    });

    $('#end-date').on('change', function () {
        endDate = new Date($('#end-date').val());
        countDates(startDate, endDate);
    });

    $('#send-message').on('click', function () {
        console.log('clicked');
    });

    $('#add-comment').click(function() {
        $('#comments-modal').modal();
    });
});