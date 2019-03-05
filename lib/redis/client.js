'use strict';

const redis = require('../db/redis');
const _ = require('lodash');

const set = async(key, obj) => {
  key = _.toString(key);
  obj = JSON.stringify(obj);
  await redis.set(key, obj);
  return true;
};

const setex = async(key, obj, expiresIn) => {
  key = _.toString(key);
  obj = JSON.stringify(obj);
  await redis.set(key, obj, 'EX', expiresIn);
  return true;
};

const get = async(key) => {
  key = _.toString(key);
  let data = await redis.get(key);
  data = JSON.parse(data);
  return data;
};

const del = async(key) => {
  key = _.toString(key);
  let delt = await redis.del(key);
  return delt === 1;
};

module.exports = {
  set: set,
  get: get,
  setex: setex,
  del: del
};
