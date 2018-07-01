const http = require('http');

var server = http.createServer(function(request, response) {
    var protocol = request.headers['x-forwarded-proto'];
    var host = request.headers['host'];
    var url = request.url;

    console.log('request from: ' + protocol + '://' + host + url);
    host = host.replace(/catchen\.biz$/, 'catchen.me');
    if (host == request.headers['host']) {
        host = 'catchen.me';
        url = '/'
    }
    var location = protocol + '://' + host + url;
    console.log('user-agent: ' + request.headers['user-agent']);
    console.log('redirect to: ' + location);

    response.writeHead(301, {
        Location: location
    });
    response.write('Permanently moved to <a href="' + location + '">' + location + '</a>.');
    response.end();
});

var port = process.env.PORT || 3000;
server.listen(port, function(){
    console.log("Listening on " + port);
});
