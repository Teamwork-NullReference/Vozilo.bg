/* globals module */
'use strict';

const DEFAULT_PAGE = 1,
    PAGE_SIZE = 10;
// NEWEST_USERS_COUNT = 5;


module.exports = function(data) {
    return {
        getAdminPage(req, res) {
            if (req.user && ((req.user.role && req.user.role.indexOf('admin') >= 0))) {
                //--------------------------------------------------------------------------------------
                let user = req.user;
                let pattern = req.query.pattern || '';
                let page = Number(req.query.page || DEFAULT_PAGE);

                data.getUsers({ pattern, page, pageSize: PAGE_SIZE })
                    .then((result => {
                        let {
                            users,
                            count
                        } = result;

                        if (count === 0) {
                            console.log(user);
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
                        console.log(user);
                        return res.render('admin/list', {
                            result: { user: req.user },
                            model: users,
                            user,
                            params: { pattern, page, pages: 0 }
                        });
                    }))
                    .catch(err => {
                        res.status(404)
                            .send(err);
                    });
            }
        }
    };
};