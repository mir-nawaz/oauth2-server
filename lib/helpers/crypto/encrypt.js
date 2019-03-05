'use strict';

const crypto = require('crypto');
const cryptoConst = require('../../constants').crypto;

module.exports = (text) => {

  return _encrypt();

  function _encrypt() {
    return new Promise((resolve) => {
      let cipher = crypto.createCipher(cryptoConst.algorithm, cryptoConst.password);
      let crypted = cipher.update(text, 'utf8', 'hex');
      crypted += cipher.final('hex');
      return resolve(crypted);
    });
  }

};
