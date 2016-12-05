/* globals jsonRequester $ window document FB */

$(function () {
    $('#btn-sign-out').click(function () {
        jsonRequester.send('post', '/sign-out', {
            options: {
                action: 'logout'
            }
        })
            .then(function () {
                window.location.replace('/');
            });

    });

    (function (d, s, id) {
        var js,
            fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = '//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.7';
        fjs.parentNode.insertBefore(js, fjs);
    } (document, 'script', 'facebook-jssdk'));

    // this gets triggered when FB object gets initialized
    window.fbAsyncInit = function () {
        console.log('FB Object initiated');
        // now we can safely call parse method
        FB.XFBML.parse();
    };
});