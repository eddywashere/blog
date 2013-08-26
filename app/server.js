'use strict';

/**
 *
 */

var express = require('express'),
app = express(),
port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.send('Hello World');
});

app.listen(port);
console.log("Express server listening on port " + port);

module.exports = app;