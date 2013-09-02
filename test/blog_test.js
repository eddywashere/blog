'use strict';

var blog = require('../app/app.js'),
should = require('should'),
request = require('supertest');

describe('Blog API', function () {
  it('should exist', function () {
    should.exist(blog);
  });

  it('should expose a listen function', function () {
    blog.app.listen.should.be.an.instanceof(Function);
  });

  it("should include a version", function (done) {
    request(blog.app)
    .get('/api')
    .end(function(err, res){
      res.should.have.status(200);
      res.text.should.include('version');
      done();
    });
  });
});