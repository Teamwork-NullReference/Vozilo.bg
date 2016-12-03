/* globals jsonRequester $ */

$(() => {
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
});