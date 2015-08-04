const http = require('http');

var server = http.createServer(function(request, response) {
    var host = request.headers['host'];
    var url = request.url;
    
    console.log('request from: http://' + host + url);
    host = host.replace(/catchen\.biz$/, 'catchen.me');
    if (host == request.headers['host']) {
        host = 'catchen.me';
        url = '/'
    }
    var location = 'http://' + host + url;
    console.log('user-agent: ' + request.headers['user-agent']);
    console.log('redirect to: ' + location);
    
    response.writeHead(302, {
        Location: location
    });
    response.write('Temporarily moved to <a href="' + location + '">' + location + '</a>.');
    response.end();
});

var port = process.env.PORT || 3000;
server.listen(port, function(){
    console.log("Listening on " + port);
});
