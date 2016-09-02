require('dotenv').config({silent:true});
var knex = require('../../config/db/knex');
var configs = require('../../lib/dbops/configs');


exports.getConfigs = function(req, res){
  // console.log('API CONFIG DATA', req.params.member_id)
  configs.getMergedConfigCollection(req.params.member_id)
  .then(function(data){
    res.json(data);
  });
};

exports.getConfigById = function(req, res){
  // console.log('API CALL',req.params.config_id)
  configs.getConfigById(req.params.config_id)
  .then(function(data){
    res.json(data);
  });
};


// app.post('/api/members/:member_id/configs/:config_id',  apiController.updateMemberConfig);
exports.updateMemberConfig = function(req, res){
  // console.log('API CALL PARAMS', req.params, req.body)
  //
  // res.json('in progress...');
  
  configs.updateMemberConfig(req.params.member_id, req.params.config_id, req.body.newValue)
  .then(function(data){
    res.json(data);
  });
};


// TODO authenticate
// app.get('/api/envkey/:keyname', apiController.getEnvKey);
exports.getEnvKey = function(req, res){
  var key = process.env[req.params.keyname];
  // console.log('KEY', req.params.keyname, key);
  res.json(key);
};

exports.getBrochures = function(req, res){
  console.log('requesting api brochures');
  knex('brochures').select('*')
  .orderBy('id')
  .then(function(data){
    res.json(data);
  });
};

exports.getBrochure = function(req, res) {
  // console.log('getting brochure', req.params);
  return knex.select().table('brochures').where('id', req.params.id)
  .first()
  .then(function(brochure){
    // console.log('git someting', brochure);
    res.status(200).json(brochure);
  });
};

exports.updateBrochure = function(req, res){

  return knex('brochures')
  .where({id:req.params.id})
  .update(req.body.brochure)
  .then(function(data){
    res.json(data); // data will be 1 on success
  });
};

exports.addBrochure = function(req, res){
  return knex('brochures').insert(req.body.brochure)
  .returning('id')
  .then(function(id){
    res.redirect('/api/brochures/' + id)
  });
};
