/* globals $ */

$(() => {
    const monthNames = ['Януари', 'Февруари', 'Март', 'Април', 'Май', 'Юни',
        'Юли', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември'
    ];

    function getMonthAndYear() {
        let month = parseInt($('#calendar').attr('month'), 10);
        let year = parseInt($('#calendar').attr('year'), 10);

        return {
            month,
            year
        };
    }

    function getFirstAndLastDaysOfCurrentMonth(year, month) {
        let date = new Date(year, month, 1),
            y = date.getFullYear(),
            m = date.getMonth();

        let firstDay = new Date(y, m, 1).getDate();
        let lastDay = new Date(y, m + 1, 0).getDate();

        return {
            firstDay,
            lastDay
        };
    }

    function drawCalendar(month, year, carAvalabilityDates) {
        if ($('#calendar')) {
            $('#calendar').remove();
        }

        let table = $('<table>')
            .attr('id', 'calendar')
            .attr('month', month)
            .attr('year', year);
        let tBody = $('<tbody>');
        let tHead = $('<thead>')
            .append($('<tr>')
                .append($('<th>').html(`${monthNames[month]} ${year}`)
                    .addClass('text-center')
                    .addClass('color-success')
                    .attr('colspan', 7)))
            .appendTo(table);

        let days = getFirstAndLastDaysOfCurrentMonth(year, month);

        let tr = $('<tr>');
        for (let i = days.firstDay; i <= days.lastDay; i += 1) {
            let td = $('<td>').html(i);
            for (let j = 0; j < carAvalabilityDates.length; j += 1) {
                let checkDate = new Date(carAvalabilityDates[j]).getDate();
                let checkYear = new Date(carAvalabilityDates[j]).getFullYear();
                let checkMonth = new Date(carAvalabilityDates[j]).getMonth();
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
        let calendar = $('#calendar-container');
        calendar.append(table);
    }

    let id = $('#car-details').attr('carId');

    function getAvailabilityFromCurrentMonth(month, year) {
        $.getJSON(`/car/${id}/calendar?month=${month}&year=${year}`, (resp) => {
            drawCalendar(month, year, resp);
        });
    }

    $('#next-month').on('click', () => {
        let monthYear = getMonthAndYear();
        let newMonth,
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

    $('#previous-month').on('click', () => {
        let monthYear = getMonthAndYear();
        let newMonth,
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