'use strict';

const user = require('../../lib/facade/user');

module.exports = class {

  static async create(req, res, next) {
    const payload = {
      name: req.body.name,
      clientId: req.body.clientId,
      address: req.body.address,
      email: req.body.email,
      password: req.body.password,
      contact: req.body.contact
    };
    const data = await user.create(payload);
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
    const data = await user.get(payload);
    res.respond(req, res, data);
  }
};
