/* globals require */
'use strict';

const config = require('./config');

let data = require('./data')(config);

const app = require('./config/application')(data);

require('./routes')({ app, data });

app.listen(config.port, () => console.log(`it works on port: ${config.port}`));