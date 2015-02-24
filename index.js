'use strict';

var http = require('http');
var querystring = require('querystring');
var slack = require('slack-notify')(process.env.SLACK_HOOK_URL);
var currency = require('currency');

var config =  {
  username: process.env.USERNAME || 'dorrars',
  emoji: process.env.EMOJI || ':moneybag:',
  token: process.env.SLACK_TOKEN || void 0
};

http.createServer(function (req, res) {
  var body = '';
  req.on('data', function(chunk) {
    body += chunk;
  });

  req.on('end', function() {
    res.writeHead(200, "OK", {'Content-Type': 'text/html'});
    res.end();

    body = querystring.parse(body);
    console.log(body);

    convert(body);
  });
}).listen(process.env.PORT || 1337);

function convert(body){
  if(config.token && config.token !== body.token){
    return console.error('Token `' + body.token + '` didn\'t match environment variable');
  }

  var text = body.text.split(' ');

  var amount = text[0];
  var from = text[1];
  var to = text[2] || process.env.DEFAULT_CURRENCY || 'DKK';

  currency(amount, from, to, function(converted){
    slack.send({
      username: config.username,
      icon_emoji: config.emoji,
      channel: body.channel_id,
      text: '_' + body.command + ' ' + body.text + '_',
      attachments: [{
        title: converted.toFixed(2) + ' ' + to.toUpperCase()
      }]
    });
  });
}
