/* globals window jsonRequester document $ */

$(document).ready(function() {
    $("#autocomplete").autocomplete({
        source: function(request, response) {
            jsonRequester.get(`/user/filter/${request.term}`)
                .then((result) => {
                    console.log(result);
                    return response(result);
                });

        },
        minLength: 2
    });

    $(".delete").click(function(e) {
        e.preventDefault();
        var user = e.target.parentElement.parentElement.id;
        var options = { data: { username: user } };
        jsonRequester.send('post', "/admin/delete", options)
            .then((res) => {
                if (res.status === 'ok') {
                    window.location.replace("/admin");
                }
                else {
                    window.location.replace("/admin");
                }
            });

    });

    $(".restore").click(function(e) {
        e.preventDefault();
        var user = e.target.parentElement.parentElement.id;
        var options = { data: { username: user } };
        jsonRequester.send('post', "/admin/restore", options)
            .then((res) => {
                if (res.status === 'ok') {
                    window.location.replace("/admin");
                }
                else {
                    console.log('Error');
                    window.location.replace("/admin");
                }
            });
    });









});