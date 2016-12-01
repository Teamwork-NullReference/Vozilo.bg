/* globals require */
'use strict';

let config = {};
if (process.env.ENV_MODE === 'PRODUCTION') {
    config.MONGOLAB_URI = process.env.MONGOLAB_URI;
    config.PORT = process.env.PORT;
} else {
    const connectionStrings = require('./config/connection-strings');
    config.MONGOLAB_URI = connectionStrings.connectionString;
    config.PORT = connectionStrings.port;
}

let data = require('./data')(config);

const app = require('./config/application')(data);

require('./routes')({ app, data });

app.listen(config.PORT, () => {
    console.log(`it works on: localhost:${config.PORT}`);
});