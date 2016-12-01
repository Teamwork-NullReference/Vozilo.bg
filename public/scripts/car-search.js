/* globals window $ */

window.onload = function () {
    $('#page-selection').bootpag({
        total: 10
    })
    .on('page', function (event, num) {

        $('#content').html('Insert content');
    });
};