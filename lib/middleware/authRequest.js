'use strict';

const oauth = require('../oauth');

function authenticateRequest(req, res, next) {
  const request = new oauth.Request(req);
  const response = new oauth.Response(res);

  return oauth.app.authenticate(request, response)
    .then(function() {
      next();
    }).catch(function(err) {
      res.status(err.code || 500).json(Object.assign(err, { message: [err.message] }));
    });
}

module.exports = authenticateRequest;
