'use strict';

var db,
mongoose = require('mongoose'),
fs = require('fs'),
env = process.env.NODE_ENV || 'development';

function connect(url) {

  db = mongoose.connect(url);

  var  models_path = './app/models',
  model_files = fs.readdirSync(models_path);

  model_files.forEach(function (file) {
    require('../../' + models_path + '/' + file);
  });

  // log any db errors
  mongoose.connection.on('error', function(err) {
    console.log(":::::::: WARNING: MONGODB ERRROR ::::::");
    console.log(err);
    console.log(":::::::::::::::::::::::::::::::::::::::");
  });

  mongoose.connection.on('open', function(err) {
    console.log(":::::::: Connected to database ::::::");
    return db;
  });
}

exports.connect = connect;

exports.connection = mongoose.connection;