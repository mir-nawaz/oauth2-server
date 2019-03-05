'use strict';

// begin app profiling
require('newrelic');
const MongoModels = require('../lib/db/mongo');
const redis = require('../lib/db/redis');
const bootstrap = require('./bootstrap');
const config = require('../config');

const main = async function() {
  const connection = {
    uri: config.get('mongo.url'),
    db: config.get('mongo.name')
  };
  await MongoModels.connect(connection, config.get('mongo.options'));

  if (redis.connected) {
    console.log('redis connnected'); // eslint-disable-line
    console.log('Models are now connected.'); // eslint-disable-line
    console.log('Starting server.'); // eslint-disable-line
    bootstrap.app.start();
  }

};

main();

// stop app
let shutdown = () => {
  MongoModels.disconnect();
  bootstrap.app.stop(() => {
    process.exit();
  });
  setTimeout(function() {
    process.exit();
  }, 10000);
};

// cleanup events
process.on('SIGTERM', shutdown); // ctrl c
process.on('SIGINT', shutdown); // ctrl z
process.on('uncaughtException', (err) => {
  console.log(err.stack);// eslint-disable-line
});
