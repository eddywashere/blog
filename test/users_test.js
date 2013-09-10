'use strict';

var blog = require('../app/app.js'),
should = require('should'),
request = require('supertest'),
User = require('../app/models/user');

describe('Users', function () {

  var testUser;

  before(function (done) {
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
      request(blog.app)
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
      request(blog.app)
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

});