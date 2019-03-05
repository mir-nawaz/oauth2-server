'use strict';

const Joi = require('joi');

module.exports = Joi.object({
  _id: Joi.object(),
  id: Joi.string().required(),
  secret: Joi.string().required(),
  name: Joi.string().required(),
  address: Joi.string(),
  grants: Joi.array().items(Joi.string())
});
