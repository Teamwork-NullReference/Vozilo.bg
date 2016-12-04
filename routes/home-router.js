/* globals module */

module.exports = function({
    app,
    controllers
}) {
    let controller = controllers.home;

    app.get('/', controller.home);
};