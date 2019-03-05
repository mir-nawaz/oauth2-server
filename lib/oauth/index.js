'use strict';

const OAuth2Server = require('oauth2-server');
const { isEmpty } = require('lodash');
const config = require('../../config');

class OAuth {

  constructor() {
    if (!isEmpty(OAuth.app)) {
      return OAuth.app;
    }
    OAuth.app = new OAuth2Server({
      model: require('./model.js'),
      accessTokenLifetime: config.get('oauth.accessTokenLifetime'),
      refreshTokenLifetime: config.get('oauth.refreshTokenLifetime'),
      allowBearerTokensInQueryString: true
    });
    return OAuth.app;
  }

}

OAuth.app = {};
OAuth.Request = OAuth2Server.Request;
OAuth.Response = OAuth2Server.Response;

module.exports = OAuth;
