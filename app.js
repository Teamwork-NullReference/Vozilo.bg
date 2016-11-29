/* globals require */
/* eslint-disable no-process-env */
'use strict';

const config = require('./config');

let data = require('./data')(config);

const app = require('./config/application')(data);

require('./routes')({ app, data });

const port = process.env.PORT || config.port;
app.listen(port, () => console.log(`it works on port: ${port}`));