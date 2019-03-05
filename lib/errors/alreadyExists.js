'use strict';

const errMsgs = require('../constants').errors;

let alreadyExistsError = function(message, status) {
  this.status = status || 409;
  this.message = new Array(`${message} ${errMsgs.alreadyExists}`);
  this.type = 'alreadyExistsError';
};

alreadyExistsError.prototype = Object.create(Error.prototype);

module.exports = alreadyExistsError;
