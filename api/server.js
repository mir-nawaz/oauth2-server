'use strict';

// begin app profiling
require('newrelic');
const MongoModels = require('../lib/db/mongo');
const redis = require('../lib/db/redis');
const bootstrap = require('./bootstrap');
const config = require('../config');
const logger = require('../lib/logger')(__filename);

const main = async function() {
  const connection = {
    uri: config.get('mongo.url'),
    db: config.get('mongo.name')
  };
  await MongoModels.connect(connection, config.get('mongo.options'));

  if (redis.connected) {
    logger.info('[main] Redis connected');
    logger.info('[main] Models connected.');
    logger.info('[main] Starting server.');
    bootstrap.app.start();
  }

};

main();

// stop app
let shutdown = () => {
  MongoModels.disconnect();
  bootstrap.app.stop(() => {
    logger.error('[shutdown] Server Stopped');
    process.exit();
  });
  setTimeout(function() {
    logger.error('[shutdown] Server Stopped');
    process.exit();
  }, 10000);
};

// cleanup events
process.on('SIGTERM', shutdown); // ctrl c
process.on('SIGINT', shutdown); // ctrl z
process.on('uncaughtException', (err) => {
  console.log(err.stack);// eslint-disable-line
});
