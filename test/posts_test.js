'use strict';

var blog = require('../app/app.js'),
should = require('should'),
request = require('supertest'),
Post = require('../app/models/post'),
User = require('../app/models/user'),
port = blog.app.get('port'),
url = "localhost:" + port;

describe('Posts', function () {

  var post,
  agent;

  before(function (done) {
    post = new Post({
      title: "Testing the ability to post",
      body: "lorem  ipsum"
    });

    post.save();

    agent = request.agent(url);

    agent
    .post('/api/users')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .send({
      username: 'testuser',
      password: 'P4SSw0RD!'
    })
    .end(function(err, res){
      done();
    });
  });

  describe('GET /api/posts', function () {
    it('should return an array of posts', function (done) {
      agent
      .get('/api/posts')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .end(function(err, res){
        res.should.have.status(200);
        res.type.should.equal('application/json');
        res.body.posts.should.be.an.instanceof(Array);
        done();
      });
    });
  });

  describe('POST /api/posts', function () {
    it('should successfully create a post with a valid request', function (done) {
      agent
      .post('/api/posts')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        title: 'Hello World!',
        body: 'Lorem ipsum dolor sit amet'
      })
      .end(function(err, res){
        res.should.have.status(201);
        res.type.should.equal('application/json');
        res.body.should.be.an.instanceof(Object);
        res.text.should.include('Post successfully created');
        done();
      });
    });

    it('should return a 400 when posting an invalid request', function (done) {
      agent
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
      agent
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
      agent
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
      agent
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

  describe('PUT /api/posts/:id', function () {
    it('should successfully update a post with a valid id', function (done) {
      agent
      .put('/api/posts/' + post._id)
      .set('Accept', 'application/json')
      .send({
        title: 'Foo World!',
        body: 'Bar ipsum dolor sit amet'
      })
      .expect('Content-Type', /json/)
      .end(function(err, res){
        res.should.have.status(200);
        res.type.should.equal('application/json');
        res.should.be.an.instanceof(Object);
        res.text.should.include('Post successfully updated');
        done();
      });
    });

    it('should return a 404 message when post not found', function (done) {
      agent
      .put('/api/posts/000000000000000000000000')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        title: 'Foo World!',
        body: 'Bar ipsum dolor sit amet'
      })
      .end(function(err, res){
        res.should.have.status(404);
        res.type.should.equal('application/json');
        res.should.be.an.instanceof(Object);
        res.text.should.include('Post not found');
        done();
      });
    });

    it('should return a 400 message when attempting to delete a post with an invalid id', function (done) {
      agent
      .put('/api/posts/123')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        title: 'Foo World!',
        body: 'Bar ipsum dolor sit amet'
      })
      .end(function(err, res){
        res.should.have.status(400);
        res.type.should.equal('application/json');
        res.should.be.an.instanceof(Object);
        res.text.should.include('Invalid ObjectID');
        done();
      });
    });
  });

  describe('DELETE /api/posts/:id', function () {
    it('should successfully delete a post with a valid id', function (done) {
      agent
      .del('/api/posts/' + post._id)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .end(function(err, res){
        res.should.have.status(200);
        res.type.should.equal('application/json');
        res.should.be.an.instanceof(Object);
        res.text.should.include('Post successfully deleted');
        done();
      });
    });

    it('should return a 404 message when post not found', function (done) {
      agent
      .del('/api/posts/' + post._id)
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

    it('should return a 400 message when attempting to delete a post with an invalid id', function (done) {
      agent
      .del('/api/posts/123')
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
    User.findOne({ username : 'testuser' }, function(err, user){
      if (err) {
        console.log(err);
      }
      user.remove(function(err){
        if (err) {
          console.log(err);
        }
      });
    });
    post.remove(function (err) {
      if (err) {
        console.log(err);
      }
    });
    done();
  });

});