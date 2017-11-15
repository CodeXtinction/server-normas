const devConfig = {
  MONGO_URL:
    'MONGOLAB URL HERE',
  JWT_SECRET: 'nnYGq6wPc9cQ8xiVIpiPb06aLVfLuezqZHvgMxjQU9onamtiOi7zu9gjMPahLhi'
};

const testConfig = {
  MONGO_URL: 'mongodb://localhost/api-normas'
};

const prodConfig = {
  MONGO_URL:
  'MONGOLAB URL HERE',
  JWT_SECRET: 'nnYGq6wPc9cQ8xiVIpiPb06aLVfLuezqZHvgMxjQU9onamtiOi7zu9gjMPahLhi'
};

const defaultConfig = {
  PORT: process.env.PORT || 3000,
  MONGO_URL:
  'MONGOLAB URL HERE'
};

function envConfig(env) {
  switch (env) {
    case 'development':
      return devConfig;
    case 'test':
      return testConfig;
    default:
      return prodConfig;
  }
}

export default {
  ...defaultConfig,
  ...envConfig(process.env.NODE_ENV)
};
