import { assert } from 'chai';
import RequestRateLimiter from '../src'
import express from 'express';
import request from'supertest';

function createApp() {
  var app = express();

  const requestRateLimiter = new RequestRateLimiter(100, 3600);

  var router = express.Router();
  router.route('/').get(function(req, res) {
    return res.json({goodCall: true});
  });

  app.use(requestRateLimiter.middleware);
  app.use(router);

  return app;
}

describe('Response rate limiter', () => {
  var app;

  // Called once before any of the tests in this block begin.
  before(function(done) {
    app = createApp();
    app.listen(function(err) {
      if (err) { return done(err); }
      done();
    });
  });

  it('should not crash', () => {
    new RequestRateLimiter(60, 60);
  });

  it('should send 100 request over period of 1 hour', (done) => {

    const router = express.Router();

    for (let i = 0; i <= 100; i++) {
      router.route('/').get(function(req, res) {
        return res.json({goodCall: true});
      });
      () => setTimeout(1000);
    }
    const req = request(app);
    req.get('/').expect(200, (err, res) => {
      if (err) done(err);
      callStatus = res.body.goodCall;
      expect(callStatus).to.equal(true);
      done();
    });
  });

  it('should respond with statuscode 429 for 101st request over period of 1 hour', (done) => {

    const router = express.Router();

    for (let i = 0; i <= 101; i++) {
      router.route('/').get(function(req, res) {
        return res.json({goodCall: true});
      });
      () => setTimeout(1000);
    }
    const req = request(app);
    req.get('/').expect(429, (err, res) => {
      if (err) done(err);
      callStatus = res.body;
      expect(callStatus).to.have.string('Rate limit exceeded');
      done();
    });
  });
});
