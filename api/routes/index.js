'use strict';

const authenticateRequest = require('../../lib/middleware/authRequest');

module.exports = class {

  /**
   * @apiGroup Body request.body body parameters
   */
  /**
   * @apiGroup Query req.query query parameters
   */

  static setup(app, router) {

    // **** OAuth Routes ******* //
    require('./oauth').setup(router);

    // **** User Routes ******* //
    require('./user').setup(router);
    app.use('/api/user', authenticateRequest);

    // **** Client Routes ******* //
    require('./client').setup(router);
    app.use('/api/client', authenticateRequest);

    app.use('/api', router);

  }
};
