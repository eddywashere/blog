'use strict';

exports.development = {
  db: 'mongodb://localhost/test'
};

exports.test = {
  db: process.env.MDB_URL || 'mongodb://localhost/test'
};

exports.production = {
  db: process.env.MDB_URL || 'mongodb://localhost/test'
};