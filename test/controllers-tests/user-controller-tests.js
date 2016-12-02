/* globals describe it beforeEach afterEach*/
'use strinct';

let chai = require('chai');
let expect = chai.expect;
let sinon = require('sinon');

const mockedUser = require('./mockedUser');
const usernameThatDoNotExsist = 'That username do not exsist in the database ... oooops there is no database coz stub';
const userWithUserNameOnly = {
    username: 'Traqn'
};
const adminUser = {
    username: 'totally random',
    role: ['admin']
};
const userWithOtherRoleButNotAdmin = {
    username: 'totally random',
    role: ['manager']
};

let data = {
    getUserByUsername: null
};

let sandbox;

beforeEach(() => {
    sandbox = sinon.sandbox.create();
    sandbox.stub(data, 'getUserByUsername', (username) => {
        let promise = new Promise((resolve, reject) => {
            if (username === mockedUser.username) {
                return resolve(mockedUser);
            }

            reject(null);
        });

        return promise;
    });
});

afterEach(() => {
    sandbox.restore();
});

describe('user-controller-tests:', () => {
    it('getDetailedUser should properly pass username to data.getUserByUsername', done => {
        let req = {
            params: {
                username: mockedUser.username
            },
            user: null
        };

        let res = {
            render: (view, objPassed) => {
                expect(objPassed.result.userDetails.username).to.equals(mockedUser.username);
                done();
            }
        };

        let controller = require('./../../controllers/user-controller')(data);
        controller.getDetailedUser(req, res);
    });

    it('getDetailedUser should pass right view when user is found', done => {
        let req = {
            params: {
                username: mockedUser.username
            },
            user: null
        };

        let res = {
            render: (view) => {

                expect(view).to.equals('profile/user-details');
                done();
            }
        };

        let controller = require('./../../controllers/user-controller')(data);
        controller.getDetailedUser(req, res);
    });

    it('getDetailedUser should pass right view when user is not found', done => {
        let req = {
            params: {
                username: usernameThatDoNotExsist
            },
            user: null
        };

        let res = {
            render: (view) => {

                expect(view).to.equals('profile/user-not-found');
                done();
            }
        };

        let controller = require('./../../controllers/user-controller')(data);
        controller.getDetailedUser(req, res);
    });

    it('getDetailedUser should pass logged user too res', done => {
        let req = {
            params: {
                username: mockedUser.username
            },
            user: userWithUserNameOnly
        };

        let res = {
            render: (view, obj) => {
                expect(obj.result.user).to.eqls(userWithUserNameOnly);
                done();
            }
        };

        let controller = require('./../../controllers/user-controller')(data);
        controller.getDetailedUser(req, res);
    });

    it('getDetailedUser should pass logged user even when search request is wrong', done => {
        let req = {
            params: {
                username: usernameThatDoNotExsist
            },
            user: userWithUserNameOnly
        };

        let res = {
            render: (view, obj) => {
                expect(obj.result.user).to.eqls(userWithUserNameOnly);
                done();
            }
        };

        let controller = require('./../../controllers/user-controller')(data);
        controller.getDetailedUser(req, res);
    });

    it('getDetailedUser should set extraInfoAllowed to true if searched user is same as logged', done => {
        let req = {
            params: {
                username: mockedUser.username
            },
            user: mockedUser
        };

        let res = {
            render: (view, obj) => {
                expect(obj.result.extraInfoAllowed).to.eqls(true);
                done();
            }
        };

        let controller = require('./../../controllers/user-controller')(data);
        controller.getDetailedUser(req, res);
    });

    it('getDetailedUser should set extraInfoAllowed to true if logged is admin', done => {
        let req = {
            params: {
                username: mockedUser.username
            },
            user: adminUser
        };

        let res = {
            render: (view, obj) => {
                expect(obj.result.extraInfoAllowed).to.eqls(true);
                done();
            }
        };

        let controller = require('./../../controllers/user-controller')(data);
        controller.getDetailedUser(req, res);
    });

    it('getDetailedUser should set extraInfoAllowed to false if logged is not admin and not same user', done => {
        let req = {
            params: {
                username: mockedUser.username
            },
            user: userWithUserNameOnly
        };

        let res = {
            render: (view, obj) => {
                expect(obj.result.extraInfoAllowed).to.eqls(false);
                done();
            }
        };

        let controller = require('./../../controllers/user-controller')(data);
        controller.getDetailedUser(req, res);
    });

    it('getDetailedUser should set extraInfoAllowed to false if logged user with diferent then admin role', done => {
        let req = {
            params: {
                username: mockedUser.username
            },
            user: userWithOtherRoleButNotAdmin
        };

        let res = {
            render: (view, obj) => {
                expect(obj.result.extraInfoAllowed).to.eqls(false);
                done();
            }
        };

        let controller = require('./../../controllers/user-controller')(data);
        controller.getDetailedUser(req, res);
    });
});