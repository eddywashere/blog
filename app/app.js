'use strict';

/**
 *
 */

var express = require('express'),
MongoStore = require('connect-mongo')(express),
routes = require('./config/routes'),
app = express(),
env = process.env.NODE_ENV || 'development',
config = require('./config/environments')[env],
database = require('./config/database'),
pass = require('./config/pass'),
path = require('path'),
rootPath = path.normalize(__dirname + '/..');

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
    app.use(express.responseTime());
    app.use(express.logger('dev'));
  }
  app.use(express.favicon());
  app.disable('x-powered-by');
  app.set('port', process.env.PORT || 8000);
  app.set('views', rootPath + '/app/views');
  app.set('view engine', 'jade');

  app.use(express.compress());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('some secret'));
  app.use(express.session({
    secret: process.env.SESSION_SECRET || "OpenSesame",
    store: new MongoStore({
      url: config.db,
      auto_reconnect: true
    })
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  if (env === "production") {
    app.use(express.csrf());
    app.use(express.logger());
  }
  app.use(function(req, res, next){
    res.locals.req = req;
    res.locals.token = req.csrfToken ? req.csrfToken() : '';
    res.cookie('XSRF-Token', res.locals.token);
    next();
  });
  app.use(app.router);
  app.use(express.static(rootPath + '/public'));
  app.use(errorHandler);
});

routes(app);

function start(cb) {
  database.connection.on('open', function(err) {
    app.listen(app.get('port'));
    if (cb) {
      cb();
    }
  });
}

exports.start = start;
exports.app = app;