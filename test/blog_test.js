'use strict';

var blog = require('../lib/app.js');

describe('blog', function () {
  it('should expose a function', function () {
    blog.awesome.should.be.an.instanceof(Function);
  });

  it('should be awesome', function () {
    blog.awesome().should.eql('awesome');
  });
});