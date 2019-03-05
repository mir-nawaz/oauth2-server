'use strict';

const MongoModels = require('../db/mongo');
const userSchema = require('./schema/user');

class User extends MongoModels {
  static create(payload) {

    const document = new User(payload);

    return this.insertOne(document);
  }

}

User.collectionName = 'user'; // the mongodb collection name
User.schema = userSchema;

module.exports = User;
