'use strict';

var blog = require('../app/server.js'),
should = require('should'),
request = require('supertest');

describe('Blog', function () {
  it('should exist', function () {
    should.exist(blog);
  });

  it('should expose a listen function', function () {
    blog.listen.should.be.an.instanceof(Function);
  });

  describe('routes', function () {
    it("should default to hello world", function (done) {
      request(blog)
      .get('/')
      .end(function(err, res){
        res.should.have.status(200);
        res.text.should.equal('Hello World');
        done();
      });
    });
  });
});