'use strict';

const errors = require('../errors');
const log = require('../logger')(__filename);

module.exports = (req, res, next) => {

  log.error('[notFoundHandler] route not found for ' + req.originalUrl + ' Method ' + req.method);

  next(new errors.NotFoundError('Route'));
};
