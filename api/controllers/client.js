'use strict';

const client = require('../../lib/facade/client');

module.exports = class {

  static async create(req, res, next) {
    const payload = {
      id: req.body.id,
      secret: req.body.secret,
      name: req.body.name,
      address: req.body.address,
      grants: req.body.grants
    };
    const data = await client.create(payload);
    res.respond(req, res, data);
  }

  static async get(req, res, next) {
    req.query = req.query || {};
    const payload = {
      name: req.query.name,
      address: req.query.address,
      email: req.query.email,
      contact: req.query.contact,
      limit: +req.query.limit,
      page: +req.query.page
    };
    const data = await client.get(payload);
    res.respond(req, res, data);
  }
};
