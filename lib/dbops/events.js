/* EVENT.js
 description: database access methods for the events table
 */


var knex = require('../../config/db/knex');
var firstBy = require('thenby');


// testing
module.exports.getEventTest = function() {
  return knex('events').first();
};


;
module.exports.recordWebhook = function(json_event){
  var event_json = JSON.parse(json_event)
  console.log('record the webhook', event_json)
};


// module.exports = {
//   getEventTest: function() {
//     return knex('events').first();
//   },
//   recordWebhook: function(json_event){
//     console.log('record the webhook')
//   }
// }