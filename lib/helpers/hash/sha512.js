'use strict';

const crypto = require('crypto');

module.exports = (text) => {

  return _create();

  function _create() {
    const hash = crypto.createHash('sha512');
    hash.update(text);
    return hash.digest('hex');
  }

};
