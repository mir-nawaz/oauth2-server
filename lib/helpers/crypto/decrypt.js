'use strict';

const crypto = require('crypto');
const cryptoConst = require('../../constants').crypto;
const errMsgs = require('../../constants').errors;

module.exports = (text) => {

  return _decrypt();

  function _decrypt() {
    return new Promise((resolve, reject) => {
      try {
        let decipher = crypto.createDecipher(cryptoConst.algorithm, cryptoConst.password);
        let dec = decipher.update(text, 'hex', 'utf8');
        dec += decipher.final('utf8');
        dec = JSON.parse(dec);
        return resolve(dec);
      }
      catch (err) {
        return reject({ message: errMsgs.invalidAccessToken, error: err });
      }
    });
  }

};
