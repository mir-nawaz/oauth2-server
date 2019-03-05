'use strict';

const _ = require('lodash');

function respond(req, res, data, data2) {
  let statuscode = 200;
  let body = data;

  if (_.isNumber(data)) {
    statuscode = data;
    // If data is a number, treat it like a status code, respond with code.
    if (data2) {
      body = data2;
      res.status(statuscode).json(body);
    }
    else {
      res.sendStatus(statuscode);
    }
  }
  else {
    res.status(statuscode).json(body);
  }
}

module.exports = (req, res, next) => {

  res.respond = respond;

  next();
};
