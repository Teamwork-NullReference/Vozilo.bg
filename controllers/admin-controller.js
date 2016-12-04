/* globals module */
'use strict';

const DEFAULT_PAGE = 1,
    PAGE_SIZE = 10;

module.exports = function({ data }) {
    return {
        getAdminPage(req, res) {
            if (req.user && ((req.user.role && req.user.role.indexOf('admin') >= 0))) {
                let user = req.user;
                let pattern = req.query.pattern || '';
                let query;
                if (Number(req.query.page) < 1) {
                    query = 1;
                } else {
                    query = req.query.page;
                }
                let page = Number(query || DEFAULT_PAGE);
                data.getUsers({ pattern, page, pageSize: PAGE_SIZE })
                    .then(result => {
                        let {
                            users,
                            count
                        } = result;

                        if (count === 0) {
                            return res.render('admin/list', {
                                result: { user: req.user },
                                model: users,
                                user,
                                params: { pattern, page, pages: 0 }
                            });
                        }

                        if (page < 1) {
                            return res.redirect('/admin?page=1');
                        }

                        let pages = count / PAGE_SIZE;
                        if (parseInt(pages, 10) < pages) {
                            pages += 1;
                            pages = parseInt(pages, 10);
                        }
                        if (page > pages) {
                            page = pages;
                            return res.redirect(`/admin?page=${page}`);
                        }
                        return res.render('admin/list', {
                            result: { user: req.user },
                            model: users,
                            user,
                            params: { pattern, page, pages: 0 }
                        });
                    })
                    .catch(err => {
                        res.status(404)
                            .send(err);
                    });
            } else {
                res.status(401).render('unauthorized', {
                    result: {
                        user: req.user
                    }
                });
            }

        },
        filterUsers(req, res) {
            if (req.user && ((req.user.role && req.user.role.indexOf('admin') >= 0))) {
                data.filterUsers(req.body.adminSearch)
                    .then((result) => {
                        return res.render('admin/list', {
                            result: { user: req.user },
                            model: result
                        });

                    });
            } else {
                res.status(401).render('unauthorized', {
                    result: {
                        user: req.user
                    }
                });
            }
        },
        deleteUser(req, res) {
            let userToDelete = req.body.username;
            if (req.user && ((req.user.role && req.user.role.indexOf('admin') >= 0)) && req.user !== userToDelete) {

                data.deleteUser(userToDelete)
                    .then(() => {
                        return res.status(202).send({ status: 'ok' });

                    });
            } else {
                res.status(401).send({ status: 'nok' });
            }

        },
        restoreUser(req, res) {
            let userToRestore = req.body.username;
            if (req.user && ((req.user.role && req.user.role.indexOf('admin') >= 0)) && req.user !== userToRestore) {
                data.restoreUser(userToRestore)
                    .then(() => {
                        return res.status(202).send({ status: 'ok' });

                    });
            } else {
                res.status(401).send({ status: 'nok' });
            }

        }
    };
};