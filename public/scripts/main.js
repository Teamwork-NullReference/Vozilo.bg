/* globals jsonRequester $ */

$(() => {
    $('#btn-sign-out').click(() => {
        jsonRequester.send('post', '/sign-out', { options: { action: 'logout' } })
            .then(() => {
                console.log('2');
                window.location.replace('/');
            });

    });
});