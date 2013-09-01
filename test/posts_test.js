'use strict';

var blog = require('../app/app.js'),
should = require('should'),
request = require('supertest');

describe('Posts', function () {

  it('should respond with json', function (done) {
    request(blog.app)
    .get('/api/posts')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .end(function(err, res){
      res.should.have.status(200);
      res.type.should.equal('application/json');
      done();
    });
  });

  it('should return a post with id', function (done) {
    request(blog.app)
    .get('/api/posts/1')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .end(function(err, res){
      res.should.have.status(200);
      res.type.should.equal('application/json');
      done();
    });
  });

});