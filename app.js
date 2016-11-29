/* globals require */
'use strict';

const config = require('./config');

let data = require('./data')(config);

const app = require('./config/application')(data);

require('./routes')({ app, data });

if (config.envMode === 'DEVELOPMENT') {
    app.listen(config.port, () => console.log(`it works on port: ${config.port}`));
} else {
    app.listen();
}