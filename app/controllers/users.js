'use strict';

// Include model
var User = require('../models/user'),
passport = require('passport');

exports.create = function (req, res, next) {
  var user = new User(req.body);
  user.provider = 'local';
  user.setPassword(req.body.password, function(user, err) {
    if (err) {
      return res.json(400, {error: err});
    }
    user.save(function (err) {
      res.format({
        json: function(){
          if (err) {
            return res.json(400, err);
          }
          req.logIn(user, function(err) {
           if (err) {
              return next(err);
           }
           return res.json(201, user);
          });
        },
        html: function(){
          if (err) {
            return res.json(400, err);
          }
          req.logIn(user, function(err) {
           if (err) {
              return next(err);
           }
           return res.redirect('/dashboard');
          });
        }
      });
    });
  });
};

exports.login = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    res.format({
      json: function(){
        if (err) { return res.json(500, {error: err.stack}); }
        if (!user) {
          req.session.messages =  [];
          return res.json(404, {error: info});
        }
        req.logIn(user, function(err) {
          if (err) { return next(err); }
          return res.json(200, req.user);
        });
      },
      html: function(){
        if (err) { return res.json(500, {error: err.stack}); }
        if (!user) {
          req.session.messages =  [];
          return res.json(404, {error: info});
        }
        req.logIn(user, function(err) {
          if (err) { return next(err); }
          res.redirect('/dashboard');
        });

      }
    });

  })(req, res, next);
};

exports.logout = function (req, res) {
  req.logout();
  res.format({
    json: function(){
      res.send({message: "Logged out"});
    },
    html: function(){
      res.redirect('/');
    }
  });
};