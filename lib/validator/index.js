'use strict';

const validator = require('revalidator');
const schemas = require('./schemas');

let validate = (payload, schema) => {
  let result = validator.validate(payload, schema);
  if (!result.valid) {
    let error = {
      status: 400,
      message: []
    };
    for (let err of result.errors) {
      error.message.push(err.message);
    }
    error.message = error.message.length ? error.message : result.errors;
    return Promise.reject(error);
  }
  return Promise.resolve(payload);
};

module.exports = {
  validate: validate,
  schemas: schemas
};
