/* globals describe it beforeEach afterEach*/
'use strinct';

let chai = require('chai');
let expect = chai.expect;
let sinon = require('sinon');

const mockedUser = require('./mockedUser');


let sandbox;
let data = {

};

beforeEach(() => {
    sandbox = sinon.sandbox.create();

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
            status: null
        };
        sandbox.stub(res, 'status', (statuscode) => {
            expect(statuscode).to.eqls(200);
            done();
        });

        let controller = require('./../../controllers/car-controller')({});
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

        let controller = require('./../../controllers/car-controller')({});
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

        let controller = require('./../../controllers/car-controller')({});
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

        let controller = require('./../../controllers/car-controller')({});
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

        let controller = require('./../../controllers/car-controller')({});
        controller.loadCreateCarForm(req, res);
    });
});