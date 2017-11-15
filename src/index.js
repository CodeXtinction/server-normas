/* eslint-disable no-console */

import express from 'express';
import constants from './config/constants';
import middlewaresConfig from './config/middlewares';
import apiRoutes from './modules';

import './config/database';

const app = express();
middlewaresConfig(app);
app.get('/', (req, res) => {
  res.send('Api Normas');
});
apiRoutes(app);

app.listen(constants.PORT, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server running on port ${constants.PORT}`);
  }
});
