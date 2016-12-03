/* globals $ */

$(function () {
    function fillModels(brand) {
        var url = '/api/carbrands?brand=' + brand,
            opt;

        $.getJSON(url, function (models) {
            var modelField = $('#model'),
                modelOption,
                model,
                option;

            for (opt of modelField.children()) {
                opt.remove();
            }

            option = $('<option>');
            for (model of models[0].models) {
                modelOption = option.clone();
                modelOption.html(model.model)
                    .appendTo(modelField);
            }
        });
    }

    $('#brand').on('change', function () {
        var selectedBrand = $('#brand').val();
        fillModels(selectedBrand);
    });
});