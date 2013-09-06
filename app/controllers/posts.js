'use strict';

// Include model
var Post = require('../models/post');

exports.index = function(req, res){
  Post.find({}, function(err, posts){
    if (err || !posts) {
      res.status(500);
      return res.json(500, { error : err.stack});
    }
    res.format({
      json: function(){
        res.send(posts);
      }
    });
  });
};

exports.show = function(req, res){
  Post.findOne({ _id : req.params.id }, function(err, post){
    if (err) {
      return res.json(500, {error: err.stack});
    } else if (!post){
      return res.json(404, {message: 'Post not found'});
    }
    res.status(200);
    res.format({
      json: function(){
        res.send(post);
      }
    });
  });
};

exports.create = function(req, res){
  var post = new Post(req.body);

  post.save(function(err, post){
    if (err) {
      res.status(400);
      res.format({
        json: function(){
          res.send(err);
        }
      });
    } else {
      res.format({
        json: function(){
          res.send({message: "Post successfully created"});
        }
      });
    }
  });
};

exports.update = function(req, res){
  Post.findOne({ _id : req.params.id }, function(err, post){
    if (err) {
      return res.json(500, {error: err.stack});
    } else if (!post){
      return res.json(404, {message: 'Post not found'});
    }

    post.title = req.body.title;
    post.body = req.body.body;
    post.updated_at = Date.now();

    post.save(function(err){
      res.status(201);
      res.format({
        json: function(){
          res.send({message: "Post successfully updated"});
        }
      });
    });
  });
};

exports.destroy = function(req, res){
  Post.findOne({ _id : req.params.id }, function(err, post){
    if (err) {
      return res.json(500, {error: err.stack});
    } else if (!post){
      return res.json(404, {message: 'Post not found'});
    }
    post.remove(function(err){
      res.status(200);
      res.format({
        json: function(){
          res.send({message: "Post successfully deleted"});
        }
      });
    });
  });
};