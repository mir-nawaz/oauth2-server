'use strict';

const redisClient = require('../redis/client');
const User = require('../models/User');
const Client = require('../models/Client');
const _ = require('lodash');
const config = require('../../config');

/**
 *
 * OAuth Model
 *
 */

class OAuthModel {

  /**
   *
   * Invoked to retrieve an existing access token previously saved through Model#saveToken().
   *
   * @param token
   * @returns {Promise<void>}
   */
  static async getAccessToken(token) {
    let access = await redisClient.get(token);
    access.accessTokenExpiresAt = new Date(access.accessTokenExpiresAt);
    if (access.refreshTokenExpiresAt) {
      access.refreshTokenExpiresAt = new Date(access.refreshTokenExpiresAt);
    }
    return access;
  }

  /**
   *
   * Invoked to retrieve a client using a client id or a client id/client secret combination, depending on the grant type.
   *
   * @param clientId
   * @param clientSecret
   * @returns {Promise<*>}
   */
  static async getClient(clientId, clientSecret) {

    return await Client.findOne({ id: clientId, secret: clientSecret });
  };

  /**
   *
   * Invoked to retrieve a user using a username/password combination.
   *
   * @param username
   * @param password
   * @returns {Promise<*>}
   */
  static async getUser(username, password) {
    let user = await User.findOne({ name: username, password: password });

    if (!_.isEmpty(user)) {
      delete user.password;
    }

    return user;
  };

  /**
   *
   * Invoked to save an access token and optionally a refresh token, depending on the grant type.
   *
   * @param token
   * @param client
   * @param user
   * @returns {Promise<*>}
   */
  static async saveToken(token, client, user) {

    if (client) {
      delete client.password;
      delete client.secret;
    }
    if (user) {
      delete user.password;
      delete user.secret;
    }

    token.client = client;
    token.user = user;

    await redisClient.setex(token.accessToken, token, config.get('oauth.accessTokenLifetime'));
    if (token.refreshToken) {
      await redisClient.setex(token.refreshToken, token, config.get('oauth.refreshTokenLifetime'));
    }

    return token;
  };

  /**
   *
   * Invoked to retrieve the user associated with the specified client.
   *
   * @param client
   * @returns {Promise<*>}
   */
  static async getUserFromClient(client) {
    return await Client.findOne({ id: client.id, secret: client.secret });
  };

  /**
   *
   * Invoked to check if the requested scope is valid for a particular client/user combination.
   *
   * @param user
   * @param client
   * @param scope
   * @returns {Promise<boolean|*>}
   */
  static async validateScope(user, client, scope) {

    scope = _.toString(user._id) === _.toString(client._id) || _.toString(user.clientId) === _.toString(client._id);

    return scope;
  }

  /**
   *
   * Invoked to retrieve an existing refresh token previously saved through Model#saveToken().
   *
   * @param refreshToken
   * @returns {Promise<void>}
   */
  static async getRefreshToken(refreshToken) {
    let access = await redisClient.get(refreshToken);
    access.accessTokenExpiresAt = new Date(access.accessTokenExpiresAt);
    if (access.refreshTokenExpiresAt) {
      access.refreshTokenExpiresAt = new Date(access.refreshTokenExpiresAt);
    }
    return access;
  }

  /**
   *
   * Invoked to revoke a refresh token.
   *
   * @param token
   * @returns {Promise<any>}
   */
  static async revokeToken(token) {
    let revoke = await Promise.all([
      redisClient.del(token.accessToken),
      redisClient.del(token.refreshToken)
    ]);

    return (revoke[0] && revoke[1]);
  }
}

module.exports = OAuthModel;
