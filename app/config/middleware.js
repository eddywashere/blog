'use strict';

var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");

exports.validateId = function (req, res, next) {
  if(checkForHexRegExp.test(req.params.id)){
    next();
  } else {
    res.json(400, { error : 'Invalid ObjectID'});
  }
};