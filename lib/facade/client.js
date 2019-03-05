'use strict';

const validator = require('../validator');
const Client = require('../models/Client');
const { isEmpty } = require('lodash');
const error = require('../errors');

module.exports = class {

  static async create(payload) {
    await validator.validate(payload, validator.schemas.client.create);
    let client = await Client.findOne({ id: payload.id });
    if (!isEmpty(client)) {
      throw new error.AlreadyExistsError('Client');
    }
    let clients = await Client.create(payload);
    return clients[0];
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

    await validator.validate(payload, validator.schemas.client.find);

    return await Client.pagedFind(query, payload.page, payload.limit, options);
  }

};

