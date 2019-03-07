'use strict';

const log = require('../logger')(__filename);

module.exports = (err, req, res, next) => {
  let failRes = _getFailedResponse(err, req);

  res.status(failRes.code);
  res.json(failRes);

  res.end();

  const headers = res.getHeaders();
  failRes.messages = failRes.message;
  log.error('[errorHandler] error occurred for ' + req.originalUrl + ' [Method] ' + req.method + ' [Status] ' + failRes.code + ' | [request-id] ' + headers['x-request-id'] + ' | [response-time] ' + headers['x-response-time'] + ' ', failRes);

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

