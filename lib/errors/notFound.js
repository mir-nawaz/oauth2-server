'use strict';

const errMsgs = require('../constants').errors;

let notFoundError = function(message, status) {
  this.status = status || 404;
  this.message = new Array(`${message} ${errMsgs.notFound}`);
  this.type = 'notFoundError';
};

notFoundError.prototype = Object.create(Error.prototype);

module.exports = notFoundError;
