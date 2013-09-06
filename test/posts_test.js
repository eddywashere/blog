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
      body: "lorem  ipsum"
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

  describe('Post /api/posts', function () {
    it('should successfully create a post with a valid request', function (done) {
      request(blog.app)
      .post('/api/posts')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        title: 'Hello World!',
        body: 'Lorem ipsum dolor sit amet'
      })
      .end(function(err, res){
        res.should.have.status(200);
        res.type.should.equal('application/json');
        res.body.should.be.an.instanceof(Object);
        res.text.should.include('Post successfully created');
        done();
      });
    });

    it('should return a 400 when posting an invalid request', function (done) {
      request(blog.app)
      .post('/api/posts')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        title: 'Hello World!',
        content: 'Lorem ipsum dolor sit amet'
      })
      .end(function(err, res){
        res.should.have.status(400);
        res.type.should.equal('application/json');
        res.body.should.be.an.instanceof(Object);
        res.text.should.include('Validation failed');
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

  describe('Delete /api/posts/:id', function () {
    it.skip('should successfully delete a post with a valid id', function (done) {
      done();
    });

    it.skip('should return a 404 message when post not found', function (done) {
      done();
    });

    it.skip('should return a 400 message when attempting to delete a post with an invalid id', function (done) {
      done();
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