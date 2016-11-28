/* globals module*/
'use strict';

module.exports = {
    connectionString: {
        dev: 'mongodb://localhost/voziloDb',
        prod: 'mongodb://Admin:123456q@ds159747.mlab.com:59747/superheroes-universe'
    },
    port: 3001,
    GOOGLE: {
        CLIENT_ID: '5ccf45cee38770b4f336',
        CLIENT_SECRET: '7e754e7ef68751ba8f63dc98175845a9dba0ebb4',
        callbackURL: 'http://127.0.0.1:3001/sign-in/google/callback'
    }
};