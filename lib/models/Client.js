'use strict';

const MongoModels = require('../db/mongo');
const clientSchema = require('./schema/client');

class Client extends MongoModels {
  static create(payload) {

    const document = new Client(payload);

    return this.insertOne(document);
  }

}

Client.collectionName = 'client'; // the mongodb collection name
Client.schema = clientSchema;

module.exports = Client;
