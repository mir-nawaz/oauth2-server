'use strict';

const controllers = require('../controllers');
const wrap = require('../../lib/middleware/wrap');

module.exports = class {

  static setup(router) {

    /**
    * @api {post} api/user create user
    * @apiName createUser
    * @apiVersion 0.0.1
    * @apiGroup User
    *
    * @apiHeader (Authorization) {String} authorization Authorization value e.g Bearer Bearer 76adb8d9e966c7428cabdc8500efcf75217b3308.
    *
    * @apiParam (Body) {String} name user name.
    * @apiParam (Body) {String} address user address.
    * @apiParam (Body) {String} email user email.
    * @apiParam (Body) {String} password user password.
    * @apiParam (Body) {String} contact user contact.
    * @apiParam (Body) {String} clientId client ID.
    *
    * @apiParamExample {json} Request-Example:
    * {
    *   "name": "black...",
    *   "address": "73798d...",
    *   "email": "mir.nawaz@...",
    *   "password": "73798d...",
    *   "contact": "034...."
    * }
    *
    * @apiSuccess (200) {object} object header object
    * @apiSuccessExample {json} Success-Response:
    * {
    * 	"name": "black...",
    * 	"address": "73798d...",
    * 	"email": "mir.nawaz@gmail.com",
    * 	"password": "asdasdas",
    * 	"contact": "034....",
    * 	"_id": "5c77cfcb8d92de4817ab0b88"
    * }
    */
    router.post('/user', wrap(async(req, res, next) => {
      await controllers.user.create(req, res, next);
    }));

    /**
    * @api {get} api/user get users
    * @apiName findUserPaginated
    * @apiVersion 0.0.1
    * @apiGroup User
    *
    * @apiHeader (Authorization) {String} authorization Authorization value e.g Bearer Bearer 76adb8d9e966c7428cabdc8500efcf75217b3308.
    *
    * @apiParam (Query) {String} [name] user name.
    * @apiParam (Query) {String} [address] user name.
    * @apiParam (Query) {String} [email] user name.
    * @apiParam (Query) {String} [contact] user name.
    * @apiParam (Query) {Number} page page current.
    * @apiParam (Query) {Number} limit page limit.
    *
    * @apiParamExample {Query} Request-Example:
    * ?page=2&limit=3&name=name..&address=address..&contact=contact..&email=email..
    *
    * @apiSuccess (200) {object} object header object
    * @apiSuccessExample {json} Success-Response:
    *{
      'data': [
        {
          '_id': '5c77ce2e6d2f3447268e0f0b',
          'name': 'd...',
          'address': '73798d...',
          'email': 'mir.nawaz@gmail.com',
          'password': 'asdasdas',
          'contact': '034....'
        }
      ],
      'pages': {
        'current': 2,
        'prev': 1,
        'hasPrev': true,
        'next': 3,
        'hasNext': false,
        'total': 2
      },
      'items': {
        'limit': 3,
        'begin': 4,
        'end': 5,
        'total': 5
      }
    *}
    */
    router.get('/user', wrap(async(req, res, next) => {
      await controllers.user.get(req, res, next);
    }));
  }

};
