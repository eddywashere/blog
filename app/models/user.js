'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema,
bcrypt = require('bcrypt');

var UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  provider: {
    type: String,
    required: true
  },
  hashed_password: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  }
});

UserSchema.method('setPassword', function (password, done) {
  var user = this;

  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      user.hashed_password = hash;
      user.salt = salt;
      return done(user, err);
    });
  });
});

UserSchema.method('verifyPassword', function(password, callback) {
  bcrypt.compare(password, this.hashed_password, callback);
});


UserSchema.pre('save', function (next) {
  if (!this.created_at) {
    this.created_at = Date.now();
    this.updated_at = this.created_at;
  } else {
    this.updated_at = Date.now();
  }
  next();
});

var User = mongoose.model('User', UserSchema);

module.exports = User;