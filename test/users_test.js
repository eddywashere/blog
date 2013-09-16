'use strict';

var blog = require('../app/app.js'),
should = require('should'),
request = require('supertest'),
User = require('../app/models/user'),
port = blog.app.get('port'),
url = "localhost:" + port;

describe('Users', function () {

  var testUser,
  agent;

  before(function (done) {
    agent = request.agent(url);
    done();
  });

  after(function (done) {
    User.findById(testUser._id, function (err, user) {
      user.remove();
    });
    done();
  });

  describe('POST /api/users', function () {
    it('should successfully create a user with a valid request', function (done) {
      agent
      .post('/api/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        username: 'testuser',
        password: 'P4SSw0RD!'
      })
      .end(function(err, res){
        res.should.have.status(201);
        res.type.should.equal('application/json');
        res.body.should.be.an.instanceof(Object);
        testUser = res.body;
        done();
      });
    });

    it('should return a 400 when posting an invalid request', function (done) {
      agent
      .post('/api/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .send({
        username: 'testuser2'
      })
      .end(function(err, res){
        res.should.have.status(400);
        res.type.should.equal('application/json');
        res.body.should.be.an.instanceof(Object);
        res.text.should.include('Invalid Password');
        done();
      });
    });
  });

  describe('GET /api/users/logout', function () {
    it('should successfully logout a user', function (done) {
      agent
      .get('/api/users/logout')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .end(function(err, res){
        res.should.have.status(200);
        res.type.should.equal('application/json');
        res.body.should.be.an.instanceof(Object);
        res.text.should.include('Logged out');
        done();
      });
    });

    it('should return an authentication error when user is already logged out', function (done) {
      agent
      .get('/api/users/logout')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .end(function(err, res){
        res.should.have.status(401);
        res.type.should.equal('application/json');
        res.body.should.be.an.instanceof(Object);
        res.text.should.include('You are not authenticated');
        done();
      });
    });
  });

});