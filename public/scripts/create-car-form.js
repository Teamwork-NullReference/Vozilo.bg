/* globals $ */

$(() => {
    $.getJSON('/api/carbrands', (brands) => {
        var brandsField = $('#car-brand-choice'),
            modelField = $('#car-model-choice'),
            brandOption,
            modelOption,
            brand,
            model,
            option;

        option = $('<option>');
        for (brand of brands) {
            brandOption = option.clone();
            brandOption.html(brand.brand).appendTo(brandsField);
            for (model of brand.models) {
                modelOption = option.clone();
                modelOption
                    .attr('brand', brand.brand)
                    .html(model.model)
                    .hide()
                    .appendTo(modelField);
            }
        }
    });

    $('#car-brand-choice').on('click', () => {
        var selectedBrand = $('#car-brand-choice'),
            model,
            allModels = $('#car-model-choice').children();
        for (model of allModels) {
            $(model).hide();
        }

        for (model of allModels) {
            if ($(model).attr('brand') === selectedBrand.val()) {
                $(model).show();
            }
        }
    });
});