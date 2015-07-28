var http = require('http');
var querystring = require('querystring');

var convert = require('./convert');

module.exports = http.createServer(function(req, res) {
  var body = '';
  req.on('data', function(chunk) {
    body += chunk;
  });

  req.on('end', function() {
    res.writeHead(200, "OK", {'Content-Type': 'text/html'});
    res.end();

    body = querystring.parse(body);

    convert(body, function (err) {
      if (err) {
        throw err;
      }
    });
  });
});
