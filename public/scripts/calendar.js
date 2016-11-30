/* globals $ */

$(() => {
    const monthNames = ['Януари', 'Февруари', 'Март', 'Април', 'Май', 'Юни',
        'Юли', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември'
    ];

    var carAvalabilityDates;

    function getFirstAndLastDaysOfCurrentMonth(currentMonth) {
        var date = currentMonth,
            y = date.getFullYear(),
            m = date.getMonth();
        var firstDay = new Date(y, m, 1).getDate();
        var lastDay = new Date(y, m + 1, 0).getDate();

        return {
            firstDay,
            lastDay
        };
    }

    function drawCalendar(currentMonth) {
        var availableDatesMonth = [];
        var month = currentMonth.getMonth();
        var year = currentMonth.getFullYear();

        for (var i = 0; i < carAvalabilityDates.length; i += 1) {
            var date = carAvalabilityDates[i].date;
            if (new Date(date).getMonth() === month &&
                carAvalabilityDates[i].isAvailable === true) {
                availableDatesMonth.push(date);
            }
        }

        if ($('#calendar')) {
            $('#calendar').remove();
        }

        var table = $('<table>')
            .attr('id', 'calendar')
            .attr('month', currentMonth);
        var tBody = $('<tbody>');
        var tHead = $('<thead>')
            .append($('<tr>')
                .append($('<th>').html(`${monthNames[month]} ${year}`)
                    .addClass('text-center')
                    .addClass('color-success')
                    .attr('colspan', 7)))
            .appendTo(table);

        var days = getFirstAndLastDaysOfCurrentMonth(currentMonth);

        var tr = $('<tr>');
        for (var i = days.firstDay; i <= days.lastDay; i += 1) {
            var td = $('<td>').html(i);
            for (var j = 0; j < availableDatesMonth.length; j += 1) {
                var checkDate = new Date(availableDatesMonth[j]).getDate();
                var checkYear = new Date(availableDatesMonth[j]).getFullYear();
                if (i === parseInt(checkDate, 10) && parseInt(checkYear, 10) === year) {
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
        var calendar = $('#calendar-container');
        calendar.append(table);
    }

    var id = $('#car-details').attr('carId');
    var currentMonth;

    $.getJSON(`/car/${id}/calendar`, (resp) => {
        carAvalabilityDates = resp[0].availability;
        currentMonth = new Date();

        drawCalendar(currentMonth);
    });

    $('#next-month').on('click', () => {
        var currentCaledarMonth = $('#calendar').attr('month');
        var newMonth = new Date(currentCaledarMonth);
        if (newMonth.getMonth() === 11) {
            newMonth = new Date(newMonth.getFullYear() + 1, 0, 1);
        } else {
            newMonth.setMonth(newMonth.getMonth() + 1);
        }
        drawCalendar(newMonth);
    });

    $('#previous-month').on('click', () => {
        var currentCaledarMonth = $('#calendar').attr('month');
        var newMonth = new Date(currentCaledarMonth);
        if (newMonth.getMonth() === 0) {
            newMonth = new Date(newMonth.getFullYear() - 1, 11, 1);
        } else {
            newMonth.setMonth(newMonth.getMonth() - 1);
        }

        drawCalendar(newMonth);
    });
});