import mongoose from 'mongoose';
import constants from './constants';

mongoose.Promise = global.Promise;

try {
  mongoose.connect(constants.MONGO_URL, {
    useMongoClient: true
  });
} catch (err) {
  mongoose.createConnection(constants.MONGO_URL, {
    useMongoClient: true
  });
}

mongoose.connection
  .once('open', () => console.log('MongoDB Running'))
  .on('error', err => {
    throw err;
  });
