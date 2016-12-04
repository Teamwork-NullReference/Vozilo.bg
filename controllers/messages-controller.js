/* globals module */
'use strict';

module.exports = function({ data }) {
    return {
        getLatestMessages(req, res) {
            let username = req.params.username;
            data.getUserByUsername(username)
                .then(user => {

                    if (user === null || typeof user === 'undefined') {
                        return res.render('profile/user-not-found', {
                            result: {
                                user: req.user
                            }
                        });
                    }

                    let isAuthorizedUser = false;

                    if (req.user &&
                        req.user.role &&
                        (req.user.role.indexOf('admin') >= 0 || username === req.user.username)) {
                        isAuthorizedUser = true;
                    }

                    if (isAuthorizedUser) {
                        // TODO: get last messages of any correspondence, sorted by date
                        // return data.getFilteredCars({ city, startDate, endDate, page, pageSize })

                        return Promise.resolve({
                            result: {
                                user: req.user,
                                correspondences: [{
                                        id: '987695786562394763292386',
                                        sender: {
                                            firstName: 'Dwayne',
                                            lastName: 'Johnson',
                                            pictureUrl: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTkyNDQ3NzAxM15BMl5BanBnXkFtZTgwODIwMTQ0NTE@._V1_UX214_CR0,0,214,317_AL_.jpg',
                                            address: {
                                                city: 'София',
                                                street: 'Цариградско шосе 123'
                                            }
                                        },
                                        message: {
                                            text: 'Are you talking to me?',
                                            datetime: '30.12.2016 14:00'
                                        }
                                    },
                                    {
                                        id: '7686399347679246789345',
                                        sender: {
                                            firstName: 'Mad',
                                            lastName: 'Marks',
                                            pictureUrl: 'http://i.imgur.com/y7Hm9.jpg',
                                            address: {
                                                city: 'София',
                                                street: 'Цариградско шосе 100'
                                            }
                                        },
                                        message: {
                                            text: 'Ще наема колата за един месец. Каква ще е отстъпката?',
                                            datetime: '3.12.2016 15:00'
                                        }
                                    }
                                ]
                            }
                        });
                    }

                    // user is unauthorized
                    res.status(401).render('unauthorized', {
                        result: {
                            user: req.user
                        }
                    });

                    return Promise.reject(`User: ${username} is unauthorized.`);
                })
                .then((latestCorrespondences) => {
                    res.status(200).render('correspondence/latests', latestCorrespondences);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        getCorrespondenceDetails(req, res) {
            let username = req.params.username;
            data.getUserByUsername(username)
                .then(user => {
                    if (user === null || typeof user === 'undefined') {
                        return res.render('profile/user-not-found', {
                            result: {
                                user: req.user
                            }
                        });
                    }

                    let isAuthorizedUser = false;

                    if (req.user &&
                        req.user.role &&
                        (req.user.role.indexOf('admin') >= 0 || username === req.user.username)) {
                        isAuthorizedUser = true;
                    }

                    if (isAuthorizedUser) {
                        // TODO: get details for selected correspondence
                        // return data.getFilteredCars({ city, startDate, endDate, page, pageSize })

                        return Promise.resolve({
                            result: {
                                user: req.user,
                                car: {
                                    id: '58402c90a67b4d00046af95f',
                                    imageUrl: 'http://calopera.com/wp-content/uploads/2015/08/2016-Jeep-Grand-Cherokee-Overland-HD-1080p.jpg'
                                },
                                carOwner: {
                                    username: 'therock',
                                    imageUrl: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTkyNDQ3NzAxM15BMl5BanBnXkFtZTgwODIwMTQ0NTE@._V1_UX214_CR0,0,214,317_AL_.jpg'
                                },
                                renter: {
                                    username: 'Ivan Banev',
                                    imageUrl: 'https://pp.vk.me/c417619/v417619498/1d63/ox2bocn6EwI.jpg'
                                },
                                messages: [{
                                        sender: 'Ivan Banev',
                                        text: 'Искам да наема колата за празниците. От 22.12.2016 до 03.01.2017',
                                        date: '03.12.2016 18:11'
                                    },
                                    {
                                        sender: 'therock',
                                        text: 'Точно тогава ще ми трябва, но давам още една кола, Volvo XC90. Виж нея.',
                                        date: '03.12.2016 18:53'
                                    },
                                    {
                                        sender: 'Ivan Banev',
                                        text: 'OK, ще я погледна.',
                                        date: '03.12.2016 19:01'
                                    }
                                ]
                            }
                        });
                    }

                    // user is unauthorized
                    res.status(401).render('unauthorized', {
                        result: {
                            user: req.user
                        }
                    });

                    return Promise.reject(`User: ${username} is unauthorized.`);
                })
                .then((correspondenceDetails) => {
                    res.status(200).render('correspondence/detailed-view', correspondenceDetails);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };
};