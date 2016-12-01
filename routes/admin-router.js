const express = require('express');


module.exports = function ({
    app,
    data
}) {
    const isAuthorized= require('../config/strategies/authorizationMiddleware')(data);
    let router = new express.Router();
    // let controller = require('../controllers/admin-controller')(data);
    
    router
        .get('/admin', isAuthorized, (req, res) => {
            res.send('It works!');
        });

    app.use('/admin', router);
    app.use('/', router);


    return router;
};