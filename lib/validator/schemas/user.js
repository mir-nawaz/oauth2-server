'use strict';

let create = {
  properties: {
    name: {
      required: true,
      type: 'string',
      minLength: 1,
      messages: {
        required: 'name is missing',
        type: 'name must be of type string',
        minLength: 'name is missing'
      }
    },
    clientId: {
      required: true,
      type: 'string',
      messages: {
        required: 'clientId is missing',
        type: 'clientId must be of type string'
      }
    },
    address: {
      required: true,
      type: 'string',
      messages: {
        required: 'address is missing',
        type: 'address must be of type string'
      }
    },
    contact: {
      required: true,
      type: 'string',
      messages: {
        required: 'contact is missing',
        type: 'contact must be of type string'
      }
    },
    email: {
      required: true,
      type: 'string',
      format: 'email',
      messages: {
        required: 'email is missing',
        type: 'email must be of type string',
        format: 'invalid email'
      }
    },
    password: {
      required: true,
      type: 'string',
      messages: {
        required: 'password is missing',
        type: 'password must be of type string'
      }
    }
  }
};

let find = {
  properties: {
    name: {
      required: false,
      type: 'string',
      minLength: 1,
      messages: {
        required: 'name is missing',
        type: 'name must be of type string',
        minLength: 'name is missing'
      }
    },
    address: {
      required: false,
      type: 'string',
      messages: {
        required: 'address is missing',
        type: 'address must be of type string'
      }
    },
    contact: {
      required: false,
      type: 'string',
      messages: {
        required: 'contact is missing',
        type: 'contact must be of type string'
      }
    },
    email: {
      required: false,
      type: 'email',
      messages: {
        required: 'email is missing',
        type: 'invalid email'
      }
    },
    password: {
      required: false,
      type: 'string',
      messages: {
        required: 'password is missing',
        type: 'password must be of type string'
      }
    },
    limit: {
      required: false,
      type: 'number',
      messages: {
        required: 'limit is missing',
        type: 'limit must be of type number'
      }
    },
    page: {
      required: false,
      type: 'number',
      messages: {
        required: 'page is missing',
        type: 'page must be of type number'
      }
    }
  }
};

module.exports = {
  create,
  find
};
