/* globals describe it beforeEach afterEach*/
'use strinct';

let chai = require('chai');
let expect = chai.expect;
let sinon = require('sinon');

const mockedUser = require('./mocked-user');

let sandbox;
let data = {};
let res = {};
const predefinedCarId = 'mjiashm312hkj3123';
const noCarMessage = 'There is not such car';
const userWithUsernamePesho = {
    username: 'Pesho'
};

const peshoCar = {
    owner: {
        username: 'Pesho'
    }
};

beforeEach(() => {
    sandbox = sinon.sandbox.create();

    data = {
        getAllBrands: null,
        getCarById: null,
        getUserByUsername: null
    };

    res = {
        status: null,
        render: null,
        send: null
    };

    sandbox.stub(data, 'getAllBrands', () => {
        return Promise.resolve({});
    });
});

afterEach(() => {
    sandbox.restore();
});

describe('car-controller tests:', () => {
    it('loadCreateCarForm should return status 200', done => {
        let req = {
            user: mockedUser
        };

        let res = {
            status: {},
            render: null
        };

        sandbox.stub(res, 'render', () => {
            // do nothing
        });

        sandbox.stub(res, 'status', (statuscode) => {
            expect(statuscode).to.equals(200);
            done();
            return res;
        });

        let controller = require('./../../controllers/car-controller')({ data });
        controller.loadCreateCarForm(req, res);
    });

    it('loadCreateCarForm should return right view', done => {
        let req = {
            user: mockedUser
        };

        let res = {
            status: null,
            render: null
        };

        sandbox.stub(res, 'status', () => {
            return res;
        });

        sandbox.stub(res, 'render', (view) => {
            expect(view).to.eqls('car/create-form');
            done();
        });

        let controller = require('./../../controllers/car-controller')({ data });
        controller.loadCreateCarForm(req, res);
    });

    it('loadCreateCarForm should return result with logged user', done => {
        let req = {
            user: mockedUser
        };

        let res = {
            status: null,
            render: null
        };

        sandbox.stub(res, 'status', () => {
            return res;
        });

        sandbox.stub(res, 'render', (view, passedObj) => {
            expect(passedObj.result.user).to.eqls(mockedUser);
            done();
        });

        let controller = require('./../../controllers/car-controller')({ data });
        controller.loadCreateCarForm(req, res);
    });

    it('loadCreateCarForm should return result with startDate 1980', done => {
        let req = {
            user: mockedUser
        };

        let res = {
            status: null,
            render: null
        };

        sandbox.stub(res, 'status', () => {
            return res;
        });

        sandbox.stub(res, 'render', (view, passedObj) => {
            expect(passedObj.result.startDate).to.eqls(1980);
            done();
        });

        let controller = require('./../../controllers/car-controller')({ data });
        controller.loadCreateCarForm(req, res);
    });

    it('loadCreateCarForm should return result with endDate current year', done => {
        let req = {
            user: mockedUser
        };

        let res = {
            status: null,
            render: null
        };

        sandbox.stub(res, 'status', () => {
            return res;
        });

        sandbox.stub(res, 'render', (view, passedObj) => {
            expect(passedObj.result.endDate).to.eqls(new Date().getFullYear());
            done();
        });

        let controller = require('./../../controllers/car-controller')({ data });
        controller.loadCreateCarForm(req, res);
    });

    it('loadCarDetails should properly pass carId to data.getCarById', done => {
        let req = {
            params: {
                id: predefinedCarId
            }
        };

        sandbox.stub(res, 'status', () => {
            return res;
        });

        sandbox.stub(res, 'send', () => {
            return res;
        });

        sandbox.stub(res, 'render', () => {
            return res;
        });

        sandbox.stub(data, 'getUserByUsername', () => {
            return Promise.resolve(userWithUsernamePesho);
        });

        sandbox.stub(data, 'getCarById', (id) => {
            expect(id).to.equals(predefinedCarId);
            done();
            return {};
        });

        let controller = require('./../../controllers/car-controller')({ data });
        controller.loadCarDetails(req, res);
    });

    it('loadCarDetails should properly pass username to data.getUserByUsername', done => {
        let req = {
            params: {
                id: predefinedCarId
            }
        };

        sandbox.stub(res, 'status', () => {
            return res;
        });

        sandbox.stub(res, 'send', () => {
            return res;
        });

        sandbox.stub(res, 'render', () => {
            return res;
        });

        sandbox.stub(data, 'getCarById', () => {
            return Promise.resolve(peshoCar);
        });

        sandbox.stub(data, 'getUserByUsername', (username) => {
            expect(username).to.equals(userWithUsernamePesho.username);
            done();
            return userWithUsernamePesho;
        });

        let controller = require('./../../controllers/car-controller')({ data });
        controller.loadCarDetails(req, res);
    });

    it('loadCarDetails should return status 404 if data.getCarById return null', done => {
        let req = {
            params: {
                id: predefinedCarId
            }
        };

        sandbox.stub(res, 'send', () => {
            return res;
        });

        sandbox.stub(res, 'render', () => {
            return res;
        });

        sandbox.stub(data, 'getCarById', () => {
            return Promise.resolve(null);
        });

        sandbox.stub(data, 'getUserByUsername', () => {
            return Promise.resolve(userWithUsernamePesho);
        });

        sandbox.stub(res, 'status', (statusCode) => {
            expect(statusCode).to.equals(404);
            done();
            return res;
        });

        let controller = require('./../../controllers/car-controller')({ data });
        controller.loadCarDetails(req, res);
    });

    it('loadCarDetails should return noCarMessage if data.getCarById return null', done => {
        let req = {
            params: {
                id: predefinedCarId
            }
        };

        sandbox.stub(res, 'render', () => {
            return res;
        });

        sandbox.stub(data, 'getCarById', () => {
            return Promise.resolve(null);
        });

        sandbox.stub(data, 'getUserByUsername', () => {
            return Promise.resolve(userWithUsernamePesho);
        });

        sandbox.stub(res, 'status', () => {
            return res;
        });

        sandbox.stub(res, 'send', (msg) => {
            expect(msg).to.equals(noCarMessage);
            done();
            return res;
        });

        let controller = require('./../../controllers/car-controller')({ data });
        controller.loadCarDetails(req, res);
    });

    it('loadCarDetails should return status 200 if car and owner are found', done => {
        let req = {
            params: {
                id: predefinedCarId
            }
        };

        sandbox.stub(res, 'send', () => {
            return res;
        });

        sandbox.stub(res, 'render', () => {
            return res;
        });

        sandbox.stub(data, 'getCarById', () => {
            return Promise.resolve(peshoCar);
        });

        sandbox.stub(data, 'getUserByUsername', () => {
            return Promise.resolve(userWithUsernamePesho);
        });

        sandbox.stub(res, 'status', (statusCode) => {
            expect(statusCode).to.equals(200);
            done();
            return res;
        });

        let controller = require('./../../controllers/car-controller')({ data });
        controller.loadCarDetails(req, res);
    });

    it('loadCarDetails should render right view if car and owner are found', done => {
        let rightView = 'car/details';
        let req = {
            params: {
                id: predefinedCarId
            }
        };

        sandbox.stub(res, 'send', () => {
            return res;
        });

        sandbox.stub(res, 'render', (view) => {
            expect(view).to.equals(rightView);
            done();
            return res;
        });

        sandbox.stub(data, 'getCarById', () => {
            return Promise.resolve(peshoCar);
        });

        sandbox.stub(data, 'getUserByUsername', () => {
            return Promise.resolve(userWithUsernamePesho);
        });

        sandbox.stub(res, 'status', () => {
            return res;
        });

        let controller = require('./../../controllers/car-controller')({ data });
        controller.loadCarDetails(req, res);
    });

    it('loadCarDetails should return status 500 if error happen', done => {
        let req = {
            params: {
                id: predefinedCarId
            }
        };

        sandbox.stub(res, 'send', () => {
            return res;
        });

        sandbox.stub(res, 'render', () => {
            return res;
        });

        sandbox.stub(data, 'getCarById', () => {
            return Promise.reject(null);
        });

        sandbox.stub(data, 'getUserByUsername', () => {
            return Promise.resolve(userWithUsernamePesho);
        });

        sandbox.stub(res, 'status', (statusCode) => {
            expect(statusCode).to.equals(500);
            done();
            return res;
        });

        let controller = require('./../../controllers/car-controller')({ data });
        controller.loadCarDetails(req, res);
    });

    it('loadCarDetails should return error message if error happen', done => {
        let errorMessage = 'someonething broke dude';
        let req = {
            params: {
                id: predefinedCarId
            }
        };

        sandbox.stub(res, 'send', (err) => {
            expect(err).to.equals(errorMessage);
            done();
            return res;
        });

        sandbox.stub(res, 'render', () => {
            return res;
        });

        sandbox.stub(data, 'getCarById', () => {
            return Promise.reject(errorMessage);
        });

        sandbox.stub(data, 'getUserByUsername', () => {
            return Promise.resolve(userWithUsernamePesho);
        });

        sandbox.stub(res, 'status', () => {
            return res;
        });

        let controller = require('./../../controllers/car-controller')({ data });
        controller.loadCarDetails(req, res);
    });
});