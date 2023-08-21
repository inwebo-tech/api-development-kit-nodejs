var port = 8000;
var express = require('./config/express');
var app = express();
app.listen(port);
module.exports = app;
console.log('Server running at http://localhost:' + port);