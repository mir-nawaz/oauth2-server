'use strict';

let create = {
  properties: {
    id: {
      required: true,
      type: 'string',
      minLength: 1,
      messages: {
        required: 'id is missing',
        type: 'id must be of type string',
        minLength: 'id is missing'
      }
    },
    secret: {
      required: true,
      type: 'string',
      minLength: 1,
      messages: {
        required: 'secret is missing',
        type: 'secret must be of type string',
        minLength: 'secret is missing'
      }
    },
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
    address: {
      required: true,
      type: 'string',
      messages: {
        required: 'address is missing',
        type: 'address must be of type string'
      }
    },
    grants: {
      required: true,
      type: 'array',
      items: [
        {
          required: true,
          type: 'string'
        }
      ],
      messages: {
        required: 'grants is missing',
        type: 'grants must be of type array'
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
