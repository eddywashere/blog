'use strict';

// stub data
var data = {foo: "bar"};

exports.index = function(req, res){
  res.json('200', data);
};

exports.show = function(req, res){
  res.json('200', data);
};