'use strict';

const errMsgs = require('../constants').errors;

let generalError = function(message, status) {

  message = message ? message : errMsgs.general;

  this.status = status || 406;
  this.message = new Array(message);
  this.type = 'general';
};

generalError.prototype = Object.create(Error.prototype);

module.exports = generalError;
