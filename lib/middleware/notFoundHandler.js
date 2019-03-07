'use strict';

const errors = require('../errors');
const log = require('../logger')(__filename);

module.exports = (req, res, next) => {

  const headers = res.getHeaders();
  log.info('[notFoundHandler] route not found for  ' + req.originalUrl + ' Method ' + req.method + ' | [request-id] ' + headers['x-request-id']);

  next(new errors.NotFoundError('Route'));
};
