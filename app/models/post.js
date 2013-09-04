'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

var PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  created_at: {
    type: Date
  },
  updated_at: {
    type: Date
  }
});

PostSchema.pre('save', function (next) {
  if (!this.created_at) {
    this.created_at = Date.now();
    this.updated_at = this.created_at;
  }
  next();
});

var Post = mongoose.model('post', PostSchema);

module.exports = Post;