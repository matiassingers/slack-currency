var slack = require('slack-notify')(process.env.SLACK_HOOK_URL);
var currency = require('currency');

var config = {
  username: process.env.USERNAME || 'dorrars',
  emoji: process.env.EMOJI || ':moneybag:',
  token: process.env.SLACK_TOKEN || void 0
};

module.exports = function(body, callback) {
  if (config.token && config.token !== body.token) {
    return callback(new Error('Token `' + body.token + '` didn\'t match environment variable'));
  }

  var text = body.text.split(' ');

  var amount = text[0];
  var from = text[1];
  var to = text[2] || process.env.DEFAULT_CURRENCY || 'DKK';

  currency(amount, from, to, function(err, converted) {
    if (err) {
      return callback(err);
    }

    var opts = {
      username: config.username,
      icon_emoji: config.emoji,
      channel: body.channel_id,
      text: '_' + body.command + ' ' + body.text + '_',
      attachments: [{
        title: converted.toFixed(2) + ' ' + to.toUpperCase()
      }]
    };

    slack.send(opts, function (err) {
      if (err) {
        return callback(err);
      }

      callback(null, opts);
    });
  });
};
