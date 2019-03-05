'use strict';

const oauth = require('../../lib/oauth');

module.exports = class {

  static async token(req, res, next) {

    const request = new oauth.Request(req);
    const response = new oauth.Response(res);

    return oauth.app.token(request, response)
      .then(function(token) {
        res.respond(req, res, token);
      }).catch(function(err) {
        res.status(err.code || 500).json(Object.assign(err, { message: [err.message] }));
      });
  }

};
