'use strict';

var db;

function connect() {

  var mongoose = require('mongoose'),
  fs = require('fs'),
  models_path = './app/models',
  model_files = fs.readdirSync(models_path),
  env = process.env.NODE_ENV || 'development';

  model_files.forEach(function (file) {
    require('.' + models_path + '/' +file);
  });

  //connect to local mongodb database
  db = mongoose.connect('mongodb://127.0.0.1:27017/test');

  //attach lister to connected event
  mongoose.connection.once('connected', function() {
    if (env === 'development') {
      console.log("Connected to database");
    }
  });

  // log any db errors
  mongoose.connection.on('error', function(err) {
    console.log(":::::::: WARNING: MONGODB ERRROR ::::::");
    console.log(err);
    console.log(":::::::::::::::::::::::::::::::::::::::");
  });

  return db;
}

exports.connect = connect;