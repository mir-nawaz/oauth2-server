'use strict';

const log = require('../logger')(__filename);

module.exports = (err, req, res, next) => {
  let failRes = _getFailedResponse(err, req);

  log.error('[errorHandler] error occured for ' + req.originalUrl + ' Method ' + req.method);
  log.error('[errorHandler] error status ' + failRes.code + ' message ' + JSON.stringify(failRes, 2));

  res.status(failRes.code);
  res.json(failRes);

  res.end();
};

function _getFailedResponse(err, req) {

  err.status = err.status ? err.status : 500;
  const error_message = err.message ? err.message : 'no error message';

  return {
    code: err.status,
    requestId: req.request_id,
    message: error_message,
    stack: err.stack
  };
}

