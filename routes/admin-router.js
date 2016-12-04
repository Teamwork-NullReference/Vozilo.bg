const express = require('express');

module.exports = function({ app, controllers }) {
    let router = new express.Router();
    let controller = controllers.admin;

    router
        .post('/search', controller.filterUsers)
        .get('/admin', controller.getAdminPage)
        .post('/admin/delete', controller.deleteUser)
        .post('/admin/restore', controller.restoreUser);

    app.use('/admin', router);
    app.use('/', router);


    return router;
};