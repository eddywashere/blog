'use strict';

var blog = require('../app/app.js'),
should = require('should'),
request = require('supertest'),
Post = require('../app/models/post');

describe('Posts', function () {

  var post;

  before(function (done) {
    post = new Post({
      title: "Testing the ability to post",
      body: "lorem  ipsum",
      date: new Date(Date.now())
    });

    post.save();
    done();
  });

  describe('GET /api/posts', function () {
    it('should return an array of posts', function (done) {
      request(blog.app)
      .get('/api/posts')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .end(function(err, res){
        res.should.have.status(200);
        res.type.should.equal('application/json');
        res.body.should.be.an.instanceof(Array);
        done();
      });
    });
  });

  describe('GET /api/posts/:id', function () {
    it('should return a single post by id', function (done) {
      request(blog.app)
      .get('/api/posts/' + post._id)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .end(function(err, res){
        res.should.have.status(200);
        res.type.should.equal('application/json');
        res.should.be.an.instanceof(Object);
        done();
      });
    });

    it('should return a 404 message when post not found', function (done) {
      request(blog.app)
      .get('/api/posts/000000000000000000000000')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .end(function(err, res){
        res.should.have.status(404);
        res.type.should.equal('application/json');
        res.should.be.an.instanceof(Object);
        res.text.should.include('Post not found');
        done();
      });
    });

    it('should return a 400 when id is not a valid ObjectID', function (done) {
      request(blog.app)
      .get('/api/posts/123')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .end(function(err, res){
        res.should.have.status(400);
        res.type.should.equal('application/json');
        res.should.be.an.instanceof(Object);
        res.text.should.include('Invalid ObjectID');
        done();
      });
    });
  });

  after(function (done) {
    post.remove(function (err) {
      if (err) {
        console.log(err);
      }
    });
    done();
  });

});