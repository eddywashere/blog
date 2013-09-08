'use strict';

/**
 *
 */

var express = require('express'),
MongoStore = require('connect-mongo')(express),
routes = require('./routes'),
app = express(),
env = process.env.NODE_ENV || 'development',
config = require('./config/environments')[env],
database = require('./config/database'),
pass = require('./config/pass');

var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy;

var errorHandler = function (err, req, res, next) {
  if (env === 'development') {
    console.error(err.stack);
  }
  return res.json(500, { error: err.stack });
};

var db = database.connect(config.db);

app.configure(function(){
  if (env === "development") {
    app.use(express.logger('dev'));
  }
  app.use(express.favicon());
  app.disable('x-powered-by');
  app.set('port', process.env.PORT || 8000);
  app.use(express.compress());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('some secret'));
  app.use(express.session({
    secret: process.env.SESSION_SECRET || "OpenSesame",
    store: new MongoStore({
      url: config.db
    })
  }));
  app.use(passport.initialize());
  app.use(passport.session());
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