/* globals  $ */

$(function () {
    function getValue(status, ev) {
        var row = $(ev.target).parent()
            .parent();

        var rentalId = row.attr('rentalId');
        var carId = row.attr('carId');
        return status + ',' + carId + ',' + rentalId;
    }

    $('.approve').on('click', function (ev) {
        var value = getValue('approve', ev);
        $('.rental-info').val(value);
    });

    $('.disapprove').on('click', function (ev) {
        var value = getValue('disapprove', ev);
        $('.rental-info').val(value);
    });
});