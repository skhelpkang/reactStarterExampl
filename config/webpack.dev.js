
const buildDev = require('./webpack.dev.builder.js');


const commonOptions = {
  entry: {
    'vendor': './app/vendor.js',
    'app': './app/app.js',
  },
  additionalExternals: {},
};

const devOptions = {
  proxy: {
    '/api/**': {
      target: 'http://localhost:18080',      // for local
      secure: false
    },
  },
};

module.exports = buildDev(commonOptions, devOptions);
