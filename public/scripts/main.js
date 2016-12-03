/* globals jsonRequester $ window */

$(function () {
    $('#btn-sign-out').click(function () {
        jsonRequester.send('post', '/sign-out', { options: { action: 'logout' } })
            .then(function () {
                console.log('2');
                window.location.replace('/');
            });

    });
});