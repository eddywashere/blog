'use strict';

// Include model
var Post = require('../models/post');

exports.index = function(req, res){
  Post.find({}, function(err, posts){
    if (err || !posts) {
      res.status(500);
      return res.render('500', { err : err});
    }
    res.json('200', posts);
  });
};

exports.show = function(req, res){
  Post.findOne({ _id : req.params.id }, function(err, post){
    if (err || !post) {
      res.status(500);
      return res.render('500');
    }
    res.json('200', post);
  });
};