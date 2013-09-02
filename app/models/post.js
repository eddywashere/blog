'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

var PostSchema = new Schema({
  title: String,
  body: String,
  date: Date
});

var Post = mongoose.model('post', PostSchema);

module.exports = Post;