const express = require('express');


module.exports = function ({ app, data }) {
    let router = new express.Router();
    let controller = require('../controllers/admin-controller')(data);

    router
        .post('/search', controller.filterUsers)
        .get('/admin', controller.getAdminPage);

    app.use('/admin', router);
    app.use('/', router);


    return router;
};