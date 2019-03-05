'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const responseTime = require('response-time');
const serveStatic = require('serve-static');
const path = require('path');
const routes = require('../routes');
const middleware = require('../../lib/middleware');
const OAuth = require('../../lib/oauth');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const config = require('../../config');

module.exports = class {
  static start() {
    let app = express();

    app.disable('x-powered-by');
    app.disable('etag');
    app.use(compression());
    app.use(helmet());
    app.use(helmet.noCache());
    app.use(cors());
    app.use(responseTime());

    app.use(serveStatic(path.resolve(__dirname, '../', 'static'), {}));
    app.set('views', path.resolve(__dirname, '../'));

    app.use(bodyParser.json({ limit: 100000 }));
    app.use(bodyParser.urlencoded({
      extended: true
    }));

    app.oauth = new OAuth();

    app.use(middleware.responseLog);

    routes.setup(app, express.Router());

    app.use(middleware.notFoundHandler);
    app.use(middleware.errorHandler);

    this.startHttpServer(app);
  }

  static startHttpServer(app) {
    this.httpServer = app.listen(config.get('api.port'), function() {
      console.log('start  ------------- on ', config.get('api.port'));// eslint-disable-line
    });
  }

  static stop(cb) {
    // close server gracefully
    this.httpServer.close(() => {
      cb();
    });
  }
};

