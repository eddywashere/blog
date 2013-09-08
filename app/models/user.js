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
    console.log(salt);
    bcrypt.hash(password, salt, function(err, hash) {
      console.log(password);
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
  }
  next();
});

var User = mongoose.model('user', UserSchema);

module.exports = User;