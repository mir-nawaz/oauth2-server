'use strict';

const redis = require('redis');
const commands = require('redis-commands').list;

const AsyncRedis = function(args) {
  const client = Array.isArray(args) ? redis.createClient(...args) : redis.createClient(args);
  return AsyncRedis.decorate(client);
};

AsyncRedis.createClient = (...args) => new AsyncRedis(args);

// this is the set of commands to NOT promisify
const commandsToSkipSet = new Set(['multi']);
// this is the set of commands to promisify
const commandSet = new Set(commands.filter((c) => !commandsToSkipSet.has(c)));

const objectDecorator = (object, decorator) => {
  for (const prop in object) {
    if (typeof object[prop] === 'function') {
      object[prop] = decorator(prop, object[prop]);
    }
  }
  return object;
};

AsyncRedis.decorate = (redisClient) => objectDecorator(redisClient, (name, method) => {
  if (commandSet.has(name)) {
    return (...args) => new Promise((resolve, reject) => {
      args.push((error, ...results) => {
        if (error) {
          reject(error, ...results);
        }
        else {
          resolve(...results);
        }
      });
      method.apply(redisClient, args);
    });
  }
  return method;
});

module.exports = AsyncRedis;
