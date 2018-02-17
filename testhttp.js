var http = require('http');

http.createServer(function(req, res){
    res.writeHead(200,{'Content-Type':'text/plain'});
    res.end('webpage response!');
}).listen(8000);
console.log('Server is running at 127.0.0.1:8000');