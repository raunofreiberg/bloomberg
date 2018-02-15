const http = require('http');

const finalhandler = require('finalhandler');
const serveStatic = require('serve-static');

const handleStaticServe = serveStatic("../build");

const server = http.createServer((req, res) => {
    const done = finalhandler(req, res);
    handleStaticServe(req, res, done);
});

server.listen(process.env.PORT || 3000);
