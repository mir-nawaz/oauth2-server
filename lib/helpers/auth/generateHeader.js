'use strict';

const validator = require('../../validator');
const repos = require('../../repositories');
const errors = require('../../errors');
const crypto = require('../crypto');

module.exports = (options) => {
  // TODO: Move validation to service layer
  return validator.validate(options, validator.schemas.auth.token)
    .then(() => repos.apps.findByKey(options.key))
    .then((app) => {
      if (!app || app.secret !== options.secret) {
        throw new errors.UnAuthorizedError('Invalid credentials');
      }

      return crypto.encrypt(JSON.stringify({
        id: app.id,
        timestamp: new Date().getTime()
      }));
    });
};
