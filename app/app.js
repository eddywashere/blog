'use strict';

/**
 *
 */

var express = require('express'),
routes = require('./routes'),
app = express(),
env = process.env.NODE_ENV || 'development',
database = require('./db');

var errorHandler = function (err, req, res, next) {
  if (env === 'development') {
    console.error(err.stack);
  }
  return res.json(500, { error: err.stack });
};

database.connect();

app.configure(function(){
  app.disable('x-powered-by');
  app.set('port', process.env.PORT || 8000);
  if (env === "development") {
    app.use(express.logger('dev'));
  }
  app.use(express.compress());
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(express.favicon());
  app.use(app.router);
  app.use(errorHandler);
});

require('./routes')(app);

function start() {
  app.listen(app.get('port'));
  console.log("Express server listening on port " + app.get('port'));
}

exports.start = start;
exports.app = app;