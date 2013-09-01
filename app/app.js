'use strict';

/**
 *
 */

var express = require('express'),
routes = require('./routes'),
app = express(),
env = process.env.NODE_ENV || 'development',
errorHandler = function (err, req, res, next) {
  if (env === 'development') {
    console.error(err.stack);
  }
  res.status(500);
  res.json('error', { error: err.stack });
};

app.configure(function(){
  app.disable('x-powered-by');
  app.set('port', process.env.PORT || 8000);
  app.use(express.logger('dev'));
  app.use(express.compress());
  app.use(express.methodOverride());
  app.use(express.bodyParser());
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