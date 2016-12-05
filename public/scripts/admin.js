/* globals window jsonRequester document $ */

$(document).ready(function () {
    $('#autocomplete').autocomplete({
        source: function (request, response) {
            jsonRequester.get('/user/filter/' + request.term)
                .then(function (result) {
                    console.log(result);
                    return response(result);
                });

        },
        minLength: 2
    });

    $('.delete').click(function (e) {
        var user, options;
        e.preventDefault();
        user = e.target.parentElement.parentElement.id;
        options = { data: { username: user } };
        jsonRequester.send('post', '/admin/delete', options)
            .then(function (res) {
                if (res.status === 'ok') {
                    window.location.replace('/admin');
                } else {
                    window.location.replace('/admin');
                }
            });

    });

    $('.restore').click(function (e) {
        var user, options;
        e.preventDefault();
        user = e.target.parentElement.parentElement.id;
        options = { data: { username: user } };
        jsonRequester.send('post', '/admin/restore', options)
            .then(function (res) {
                if (res.status === 'ok') {
                    window.location.replace('/admin');
                } else {
                    console.log('Error');
                    window.location.replace('/admin');
                }
            });
    });
});