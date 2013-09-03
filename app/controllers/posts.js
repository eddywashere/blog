'use strict';

// Include model
var Post = require('../models/post');

exports.index = function(req, res){
  Post.find({}, function(err, posts){
    if (err || !posts) {
      res.status(500);
      return res.json(500, { error : err.stack});
    }
    res.json('200', posts);
  });
};

exports.show = function(req, res){
  Post.findOne({ _id : req.params.id }, function(err, post){
    if (err) {
      return res.json(500, {'error': err.stack});
    } else if (!post){
      return res.json(404, {'message': 'Post not found'});
    }
    res.json('200', post);
  });
};