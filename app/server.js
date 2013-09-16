'use strict';

var server = require('./app');

console.log("Starting web server...");
server.start(function(){
  console.log("Express server listening on port " + server.app.get('port'));
});