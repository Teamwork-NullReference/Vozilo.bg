/* globals require */
'use strict';

const config = require('./config');
const connectionSettings = require('./config/connection-strings');

let data = require('./data')(config, connectionSettings);

const app = require('./config/application')(data);

require('./routes')({ app, data });

const port = process.env.PORT || connectionSettings.port;
app.listen(port, () => console.log(`it works on: localhost:${port}`));