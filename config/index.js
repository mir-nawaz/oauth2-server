'use strict';

const convict = require('convict');
const path = require('path');
const fs = require('fs');

const config = convict({
  env: {
    doc: 'Application Environment',
    format: ['develop', 'qa', 'prod'],
    default: 'develop',
    env: 'NODE_ENV'
  },
  api: {
    port: {
      format: 'port',
      default: 3004
    }
  },
  mongo: {
    url: {
      format: String,
      default: 'mongodb://127.0.0.1:27017'
    },
    name: {
      format: String,
      default: 'open-api'
    },
    options: {
      useNewUrlParser: true,
      numberOfRetries: 5,
      connectTimeoutMS: 500,
      auto_reconnect: true,
      poolSize: 40
    }
  },
  oauth: {
    accessTokenLifetime: 60 * 60,
    refreshTokenLifetime: 2 * 60 * 60
  }

});

const env = config.get('env');
const configPath = path.join(__dirname, `./${env}.json`);
if (fs.existsSync(configPath)) {
  config.loadFile(configPath);
}
config.validate({ allowed: 'strict' });

module.exports = config;
