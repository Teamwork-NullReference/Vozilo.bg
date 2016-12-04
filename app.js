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

const hashGenerator = require('./utils/hashGenerator');
const validator = require('./utils/validator');

const data = require('./data')({ config, validator });

const app = require('./config/application')(data);

const controllers = require('./controllers')({ data, hashGenerator, validator });

require('./routes')({ app, data, controllers });

app.listen(config.PORT, () => {
    console.log(`it works on: localhost:${config.PORT}`);
});