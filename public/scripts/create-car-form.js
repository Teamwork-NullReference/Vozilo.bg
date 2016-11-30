/* globals $ */

$(() => {
    let $allModels = $('.model-options');
    for (let model of $allModels) {
        $(model).hide();
    }

    $('#car-brand-choice').on('click', () => {
        let $selectedBrand = $('#car-brand-choice').val();
        for (let model of $allModels) {
            $(model).hide();
        }

        for (let model of $allModels) {
            if ($(model).attr('brand') === $selectedBrand) {
                $(model).show();
            }
        }
    });
});