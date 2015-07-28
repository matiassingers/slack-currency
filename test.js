var assert = require('assert');
var proxyquire = require('proxyquire');
var sinon = require('sinon');

var got = require('got');

describe('server', function () {
  var server;

  beforeEach(function () {
    proxyquire('./convert', {
      'currency': sinon.stub()
    });

    server = require('./server');
    server.listen(1337);
  });

  afterEach(function () {
    server.close();
  });

  it('should accept a slack payload', function (done) {
    var payload = {
      token: 'a1337',
      text: '10 DKK USD',
      channel_id: 1337,
      command: 'currency'
    };

    var opts = {
      body: payload
    };

    got.post('http://localhost:1337', opts, function (err, data, res) {
      assert.equal(err, null);
      assert.equal(200, res.statusCode);

      done();
    });
  })
});

describe('convert', function () {
  var convert, slackSpy, currencySpy;

  beforeEach(function () {
    delete require.cache[require.resolve('./convert')];

    process.env.SLACK_TOKEN = 'aToken';
    process.env.SLACK_HOOK_URL = 'https://some.herokuapp.com';

    slackSpy = {
      send: sinon.spy(function (opts, done) {
        done(null);
      })
    };
    currencySpy = sinon.spy(function (amount, from, to, callback) {
      callback(null, 67.10);
    });

    proxyquire('./convert', {
      'slack-notify': function () {
        return slackSpy;
      },
      'currency': currencySpy
    });

    convert = require('./convert');
  });

  it('should throw err if token does not match', function (done) {
    var convert = require('./convert');

    var body = {
      token: 'aInvalid'
    };

    convert(body, function (err, converted) {
      assert.equal(err.message, 'Token `aInvalid` didn\'t match environment variable');
      assert.equal(converted, void 0);

      done();
    });
  });

  it('should convert currency', function (done) {
    var convert = require('./convert');

    var body = {
      token: 'aToken',
      text: '10 DKK USD',
      channel_id: 1337,
      command: 'currency'
    };

    convert(body, function (err, opts) {
      assert.equal(err, null);
      assert.equal(opts.text, '_currency 10 DKK USD_');
      assert.equal(opts.channel, body.channel_id);
      assert.equal(currencySpy.calledOnce, true);
      assert.equal(currencySpy.getCall(0).args[0], 10);
      assert.equal(currencySpy.getCall(0).args[1], 'DKK');
      assert.equal(currencySpy.getCall(0).args[2], 'USD');
      assert.equal(slackSpy.send.calledOnce, true);

      done();
    });
  });
});
