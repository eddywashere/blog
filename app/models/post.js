'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  body: {
    type: String,
    required: true,
    trim: true
  },
  created_at: {
    type: Date
  },
  updated_at: {
    type: Date
  },
  user: {
    type : Schema.ObjectId,
    ref : 'User'
  }
});

PostSchema.pre('save', function (next) {
  if (!this.created_at) {
    this.created_at = Date.now();
    this.updated_at = this.created_at;
  } else {
    this.updated_at = Date.now();
  }
  next();
});

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;