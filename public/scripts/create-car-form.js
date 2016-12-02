/* globals $ */

$(() => {
    function fillModels(brand) {
        var url = '/api/carbrands?brand=' + brand;
        $.getJSON(url, (models) => {
            var modelField = $('#model'),
                modelOption,
                model,
                option;

            for (let opt of modelField.children()) {
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

    $('#brand').on('change', () => {
        var selectedBrand = $('#brand').val();
        fillModels(selectedBrand);
    });
});