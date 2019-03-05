'use strict';

const validator = require('../validator');
const User = require('../models/User');
const Client = require('../models/Client');
const { isEmpty } = require('lodash');
const error = require('../errors');

module.exports = class {

  static async create(payload) {
    await validator.validate(payload, validator.schemas.user.create);
    let client = await Client.findById(payload.clientId);
    if (isEmpty(client)) {
      throw new error.NotFoundError('Client');
    }
    let users = await User.create(payload);
    return users[0];
  }

  static async get(payload) {

    const options = {
      sort: { name: 1 }
    };

    let query = {};
    if (payload.name) {query.name = payload.name;}
    if (payload.email) {query.email = payload.email;}
    if (payload.contact) {query.contact = payload.contact;}
    if (payload.address) {query.address = payload.address;}

    await validator.validate(payload, validator.schemas.user.find);

    return await User.pagedFind(query, payload.page, payload.limit, options);
  }

};

