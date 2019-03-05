'use strict';

const crypto = require('../../helpers/crypto');
const validator = require('../../validator');

module.exports = (req, res, next) => {
  let authorization = req.header('Authorization') || '';

  return crypto.decrypt(authorization)
    .then((decrypted) => _validate(decrypted))
    .then((app) => {
      req.auth = app;
      next();
    })
    .catch(next);

  function _validate(input) {
    return validator.validate(input, validator.schemas.auth.header)
      .then(() => {
        return { hello: 'world!' };
      });
  }
};
