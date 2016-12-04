/* globals jsonRequester $ window */

$(function () {
    $('#btn-sign-out').click(function () {
        jsonRequester.send('post', '/sign-out', { options: { action: 'logout' } })
            .then(function () {
                window.location.replace('/');
            });

    });
});