/* globals $ document jsonRequester*/
'use strict';

function addCommentsToElement(data, elementSelector) {
    var $commentsTab = $(elementSelector),
        $container,
        $heading,
        $link,
        $panelBody,
        $content;

    if (!$commentsTab) {
        return;

    }

    $container = $('<div />')
        .addClass('panel')
        .addClass('panel-primary')
        .addClass('review-tab');

    $link = $('<a />')
        .attr('href', '/user/' + data.senderUsername)
        .html(data.senderUsername);

    $heading = $('<div />')
        .addClass('panel-heading')
        .append($link);

    $content = $('<span />')
        .html(data.content);

    $panelBody = $('<div />')
        .addClass('panel-body')
        .append($content);

    $container.append($heading).append($panelBody);

    $commentsTab.prepend($container);

    $('#close-modal').click();
}

$(document).ready(function() {
    $('#add-comment').click(function() {
        $('#comments-modal').modal();
    });

    $('#modal-success').click(function() {
        var recipient = $('#recipient-username').val(),
            content = $('#content-area').val(),
            options = {
                data: {
                    content
                }
            };

        jsonRequester.post('/user/' + recipient + '/comments', options)
            .then(data => {
                if ($('#profile-wrapper')) {
                    addCommentsToElement(data, '#user-reviews');
                }

            })
            .catch(err => {
                console.log(err);
            });
    });
});