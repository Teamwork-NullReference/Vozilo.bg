/* globals  $ */

$(function () {
    function getValue(status, ev) {
        let row = $(ev.target).parent()
            .parent();

        let rentalId = row.attr('rentalId');
        let carId = row.attr('carId');
        return status + ',' + carId + ',' + rentalId;
    }

    $('.approve').on('click', function (ev) {
        let value = getValue('approve', ev);
        $('.rental-info').val(value);
    });

    $('.disapprove').on('click', function (ev) {
        let value = getValue('disapprove', ev);
        $('.rental-info').val(value);
    });
});