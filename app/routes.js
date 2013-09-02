'use strict';

// require controllers
var posts = require('./controllers/posts');

// "Resourceful" Routes

// GET    /posts        index   display a list of all posts
// GET    /posts/new      new     return an HTML form for creating a new post
// POST   /posts        create    create a new post
// GET    /posts/:id      show    display a specific post
// GET    /posts/:id/edit   edit    return an HTML form for editing a post
// PUT    /posts/:id      update    update a specific post
// DELETE /posts/:id      destroy   delete a specific post

module.exports = function(app) {
  app.get('/api', function(req, res){
    res.send(200, {'version' : '0.0.1'});
  });

  app.get('/api/posts', posts.index);
  // app.post('/api/posts', post.create);
  app.get('/api/posts/:id', posts.show);
  // app.put('/api/posts/:id', post.update);
  // app.del('/api/posts/:id', post.destroy);
};