const http = require('http');

const server = http.createServer(function(request, response) {
  const url = new URL(
    request.headers['x-forwarded-proto'] +
      '://' +
      request.headers['host'] +
      request.url,
  );

  console.log('request from: ' + url.toString());
  if (url.host.match(/catchen\.biz$/)) {
    url.host = url.host.replace(/catchen\.biz$/, 'catchen.me');
  } else {
    url.protocol = 'https:';
    url.host = 'catchen.me';
    url.path = '/';
  }

  const location = url.toString();
  console.log('user-agent: ' + request.headers['user-agent']);
  console.log('redirect to: ' + url.toString());

  response.writeHead(301, {
    Location: location,
  });
  response.write(
    'Permanently moved to <a href="' + location + '">' + location + '</a>.',
  );
  response.end();
});

const port = process.env.PORT || 3000;
server.listen(port, function() {
  console.log('Listening on ' + port);
});
