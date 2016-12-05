/* globals $ */

$(function () {
    var monthNames = ['Януари', 'Февруари', 'Март', 'Април', 'Май', 'Юни',
            'Юли', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември'
        ],
        id;

    function getMonthAndYear() {
        var month = parseInt($('#calendar').attr('month'), 10);
        var year = parseInt($('#calendar').attr('year'), 10);

        return {
            month: month,
            year: year
        };
    }

    function getFirstAndLastDaysOfCurrentMonth(year, month) {
        var date = new Date(year, month, 1),
            y = date.getFullYear(),
            m = date.getMonth();

        var firstDay = new Date(y, m, 1).getDate();
        var lastDay = new Date(y, m + 1, 0).getDate();

        return {
            firstDay: firstDay,
            lastDay: lastDay
        };
    }

    function drawCalendar(month, year, carAvalabilityDates) {
        var table, tBody, tHead, days, tr, i, j, td, checkDate, checkYear, checkMonth, calendar;

        if ($('#calendar')) {
            $('#calendar').remove();
        }

        table = $('<table>')
            .attr('id', 'calendar')
            .attr('month', month)
            .attr('year', year);
        tBody = $('<tbody>');
        tHead = $('<thead>')
            .append($('<tr>')
                .append($('<th>').html(monthNames[month] + ' ' + year)
                    .addClass('text-center')
                    .addClass('color-success')
                    .attr('colspan', 7)))
            .appendTo(table);

        days = getFirstAndLastDaysOfCurrentMonth(year, month);

        tr = $('<tr>');
        for (i = days.firstDay; i <= days.lastDay; i += 1) {
            td = $('<td>').html(i);
            for (j = 0; j < carAvalabilityDates.length; j += 1) {
                checkDate = new Date(carAvalabilityDates[j]).getDate();
                checkYear = new Date(carAvalabilityDates[j]).getFullYear();
                checkMonth = new Date(carAvalabilityDates[j]).getMonth();
                if (i === parseInt(checkDate, 10) && parseInt(checkYear, 10) === year && parseInt(checkMonth, 10) === month) {
                    td.addClass('car-available');
                }
            }

            td.appendTo(tr);
            if (i % 7 === 0) {
                tBody.append(tr);
                tr = $('<tr>');
            }
        }

        tBody.append(tr);
        tBody.appendTo(table);
        calendar = $('#calendar-container');
        calendar.append(table);
    }

    id = $('#car-details').attr('carId');

    function getAvailabilityFromCurrentMonth(month, year) {
        var url = '/car/' + id + '/calendar?month=' + month + '&year=' + year;
        $.getJSON(url, function (resp) {
            drawCalendar(month, year, resp);
        });
    }

    $('#next-month').on('click', function () {
        var monthYear = getMonthAndYear();
        var newMonth,
            newYear;
        if (monthYear.month === 11) {
            newYear = monthYear.year + 1;
            newMonth = 0;
        } else {
            newYear = monthYear.year;
            newMonth = monthYear.month + 1;
        }

        getAvailabilityFromCurrentMonth(newMonth, newYear);
    });

    $('#previous-month').on('click', function () {
        var monthYear = getMonthAndYear();
        var newMonth,
            newYear;

        if (monthYear.month === 0) {
            newYear = monthYear.year - 1;
            newMonth = 11;
        } else {
            newYear = monthYear.year;
            newMonth = monthYear.month - 1;
        }

        getAvailabilityFromCurrentMonth(newMonth, newYear);
    });

    getAvailabilityFromCurrentMonth(new Date().getMonth(), new Date().getFullYear());
});