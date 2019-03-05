'use strict';

const Joi = require('joi');

module.exports = Joi.object({
  _id: Joi.object(),
  clientId: Joi.string(),
  name: Joi.string().required(),
  email: Joi.string().email(),
  contact: Joi.string(),
  address: Joi.string(),
  password: Joi.string()
});
