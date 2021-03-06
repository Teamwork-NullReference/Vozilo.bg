/* globals $ document location jsonRequester */
'use strict';

$(document).ready(function() {
    $('#first-tab a').click(function(e) {
        e.preventDefault();
        $('.profile-tab').addClass('hidden');
        $('#prfile-info').removeClass('hidden');
    });

    $('#second-tab a').click(function(e) {
        e.preventDefault();
        $('.profile-tab').addClass('hidden');
        $('#user-cars').removeClass('hidden');
    });

    $('#third-tab a').click(function(e) {
        e.preventDefault();
        $('.profile-tab').addClass('hidden');
        $('#user-reviews').removeClass('hidden');
    });

    $('#rating-select').change(function() {
        var username = $('#username').text();
        var rating = $('select option:selected').val();
        jsonRequester.put('/user/' + username + '/rating', { data: { rating: rating } })
            .then(function() {
                location.reload();
            })
            .catch(function(err) {
                console.log(err);
            });
    });
});