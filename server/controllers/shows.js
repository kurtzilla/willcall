require('dotenv').config({silent:true});
// var moment = require('moment');
// var qs = require('querystring');
var shows = require('../../lib/dbops/shows');


//////////////////////////////////////////////////////////////////////
// GET a single show
//////////////////////////////////////////////////////////////////////

exports.getShowById = function(req, res){
  // console.log('API CONFIG DATA', req.params)
  shows.getShowById(req.params.show_id)
  .then(function(data){
    res.json(data);
  });
};
