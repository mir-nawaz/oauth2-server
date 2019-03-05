'use strict';

const controllers = require('../controllers');
const wrap = require('../../lib/middleware/wrap');

module.exports = class {

  static setup(router) {

    /**
     * @api {post} api/oauth/token authorize user
     * @apiName authUser
     * @apiVersion 0.0.1
     * @apiGroup Auth
     *
     * @apiParam (form) {String} client_id client id.
     * @apiParam (form) {String} client_secret client secret.
     * @apiParam (form) {String} grant_type grant type [password, refresh_token, client_credentials].
     * @apiParam (form) {String} username user name.
     * @apiParam (form) {String} password user password.
     * @apiParam (form) {String} refresh_token refresh token.
     *
     * @apiParamExample {json} Request-Example:
     * {
     *   "client_id": "black...",
     *   "client_secret": "73798d...",
     *   "grant_type": "password",
     *   "password": "73798d...",
     *   "username": "034...."
     * }
     *
     * @apiSuccess (200) {object} object header object
     * @apiSuccessExample {json} Success-Response:
     *
     *
     * {
          "accessToken": "bd1d391a520015224c466ec2826723f195764d18",
          "accessTokenExpiresAt": "2019-03-05T11:11:15.698Z",
          "scope": true,
          "refreshToken": "8fa2919e83bc94d5fbd626a06da9762f4d45ebb6",
          "refreshTokenExpiresAt": "2019-03-05T12:11:15.698Z",
          "client": {
              "_id": "5c7d09190958795f13d4faa9",
              "id": "client2",
              "name": "black...",
              "address": "adasda",
              "grants": [
                  "password",
                  "client_credentials",
                  "refresh_token"
              ]
          },
          "user": {
              "_id": "5c77c5cdbec2a8401774c148",
              "name": "name1",
              "address": "73798d...",
              "email": "mir.nawaz@avanzasolutions.com",
              "contact": "034....",
              "clientId": "5c7d09190958795f13d4faa9"
          }
      }
     */
    router.post('/oauth/token', wrap(async(req, res, next) => {
      await controllers.oauth.token(req, res, next);
    }));

  }

};
