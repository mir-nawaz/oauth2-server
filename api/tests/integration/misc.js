'use strict';

const hippie = require('hippie');

function web() {
  return hippie()
    .use((options, next) => {
      options.strictSSL = false;
      next(options);
    })
    .base('http://localhost:3004')
    .timeout(10000);
}

describe('test', function() {
  it('/doc', function(done) {
    web().get('/doc').expectStatus(301).end(done);
  });
});
