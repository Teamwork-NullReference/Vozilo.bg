/* globals module */

module.exports = function(app, data) {
    let controller = require('../controllers/home-controller')(data);

    app.get('/', controller.home);
};