'use strict';

// require controllers
var posts = require('../controllers/posts'),
users = require('../controllers/users'),
helper = require('./middleware'),
pass = require('./pass');

// "Resourceful" Routes

// GET    /posts        index   display a list of all posts
// GET    /posts/new      new     return an HTML form for creating a new post
// POST   /posts        create    create a new post
// GET    /posts/:id      show    display a specific post
// GET    /posts/:id/edit   edit    return an HTML form for editing a post
// PUT    /posts/:id      update    update a specific post
// DELETE /posts/:id      destroy   delete a specific post

module.exports = function(app) {

  app.get('/', function(req, res){
    res.render('login');
  });

  app.get('/dashboard', pass.ensureAuthenticated, function(req, res){
    res.render('dashboard');
  });

  app.get('/login', function(req, res){
    res.render('login');
  });

  app.get('/logout', users.logout);


  // API Routes

  app.get('/api', function(req, res){
    res.send(200, {'version' : '0.0.1'});
  });

  app.post('/api/users/login', users.login);
  app.get('/api/users/logout', pass.ensureAuthenticated, users.logout);
  app.post('/api/users', users.create);

  app.get('/api/posts', posts.index);
  app.post('/api/posts', pass.ensureAuthenticated, posts.create);
  app.get('/api/posts/:id', pass.ensureAuthenticated, helper.validateId, posts.show);
  app.put('/api/posts/:id', pass.ensureAuthenticated, helper.validateId, posts.update);
  app.del('/api/posts/:id', pass.ensureAuthenticated, helper.validateId, posts.destroy);
};

// pass.ensureAuthenticated