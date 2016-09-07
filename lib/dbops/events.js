/* EVENT.js
 description: database access methods for the events table
 */

var knex = require('../../config/db/knex');
var firstBy = require('thenby');

module.exports.getMemberEventCollection = function(member_id){
  return knex('eventqs').where({affectedid:member_id}).orderBy('id','desc').limit(50);
};

module.exports.recordWebhook = function(json_event){
  return new Promise(function(resolve, reject){

    return resolve('aok')
  });
};
