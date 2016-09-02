/* EVENT.js
 description: database access methods for the events table
 */


var knex = require('../../config/db/knex');
var firstBy = require('thenby');


// testing
module.exports.getEventTest = function() {
  return knex('events').first();
};


module.exports.recordWebhook = function(json_event){
  console.log('ENTER events.js - record the webhook', json_event)
  // var event_json = JSON.parse(json_event)
  // console.log('record the webhook', event_json)
  // return 'aok';
  return new Promise(function(resolve, reject){

    return resolve('aok')
  });
};


// ENTER events.js - record the webhook { created: 1326853478,
// 2016-09-02T22:29:25.506373+00:00 app[web.1]:   livemode: false,
// 2016-09-02T22:29:25.506373+00:00 app[web.1]:   id: 'evt_00000000000000',
// 2016-09-02T22:29:25.506374+00:00 app[web.1]:   type: 'product.created',
// 2016-09-02T22:29:25.506374+00:00 app[web.1]:   object: 'event',
// 2016-09-02T22:29:25.506376+00:00 app[web.1]:   pending_webhooks: 1,
// 2016-09-02T22:29:25.506376+00:00 app[web.1]:   api_version: '2016-07-06',
// 2016-09-02T22:29:25.506375+00:00 app[web.1]:   request: null,
// 2016-09-02T22:29:25.506377+00:00 app[web.1]:   user_id: 'acct_00000000000000',
// 2016-09-02T22:29:25.506378+00:00 app[web.1]:   data:
//   2016-09-02T22:29:25.506378+00:00 app[web.1]:    { object:
//   2016-09-02T22:29:25.506379+00:00 app[web.1]:       { id: 'prod_00000000000000',
// 2016-09-02T22:29:25.506379+00:00 app[web.1]:         object: 'product',
// 2016-09-02T22:29:25.506380+00:00 app[web.1]:         active: true,
// 2016-09-02T22:29:25.506381+00:00 app[web.1]:         attributes: [Object],
// 2016-09-02T22:29:25.506381+00:00 app[web.1]:         caption: null,
// 2016-09-02T22:29:25.506382+00:00 app[web.1]:         created: 1472855365,
// 2016-09-02T22:29:25.506382+00:00 app[web.1]:         deactivate_on: [],
// 2016-09-02T22:29:25.506383+00:00 app[web.1]:         description: 'Comfortable gray cotton t-shirts',
// 2016-09-02T22:29:25.506383+00:00 app[web.1]:         images: [],
// 2016-09-02T22:29:25.506384+00:00 app[web.1]:         metadata: {},
//   2016-09-02T22:29:25.506384+00:00 app[web.1]:         livemode: false,
//   2016-09-02T22:29:25.506385+00:00 app[web.1]:         name: 'T-shirt',
//   2016-09-02T22:29:25.506386+00:00 app[web.1]:         package_dimensions: null,
//   2016-09-02T22:29:25.506386+00:00 app[web.1]:         shippable: true,
//   2016-09-02T22:29:25.506387+00:00 app[web.1]:         skus: [Object],
//   2016-09-02T22:29:25.506387+00:00 app[web.1]:         updated: 1472855365,
//   2016-09-02T22:29:25.506388+00:00 app[web.1]:         url: null } } }
//
//
// without connect data
// ENTER events.js - record the webhook { created: 1326853478,
// 2016-09-02T22:27:55.847575+00:00 app[web.1]:   id: 'evt_00000000000000',
// 2016-09-02T22:27:55.847575+00:00 app[web.1]:   type: 'coupon.created',
// 2016-09-02T22:27:55.847576+00:00 app[web.1]:   object: 'event',
// 2016-09-02T22:27:55.847577+00:00 app[web.1]:   request: null,
// 2016-09-02T22:27:55.847577+00:00 app[web.1]:   pending_webhooks: 1,
// 2016-09-02T22:27:55.847578+00:00 app[web.1]:   api_version: '2016-07-06',
// 2016-09-02T22:27:55.847578+00:00 app[web.1]:   data:
//   2016-09-02T22:27:55.847579+00:00 app[web.1]:    { object:
//   2016-09-02T22:27:55.847580+00:00 app[web.1]:       { id: '25OFF_00000000000000',
// 2016-09-02T22:27:55.847580+00:00 app[web.1]:         object: 'coupon',
// 2016-09-02T22:27:55.847581+00:00 app[web.1]:         amount_off: null,
// 2016-09-02T22:27:55.847581+00:00 app[web.1]:         created: 1472855272,
// 2016-09-02T22:27:55.847582+00:00 app[web.1]:         currency: 'usd',
// 2016-09-02T22:27:55.847583+00:00 app[web.1]:         duration: 'repeating',
// 2016-09-02T22:27:55.847583+00:00 app[web.1]:         duration_in_months: 3,
// 2016-09-02T22:27:55.847584+00:00 app[web.1]:         livemode: false,
// 2016-09-02T22:27:55.847584+00:00 app[web.1]:         max_redemptions: null,
// 2016-09-02T22:27:55.847585+00:00 app[web.1]:         metadata: {},
//   2016-09-02T22:27:55.847585+00:00 app[web.1]:         percent_off: 25,
//   2016-09-02T22:27:55.847597+00:00 app[web.1]:         redeem_by: null,
//   2016-09-02T22:27:55.847598+00:00 app[web.1]:         times_redeemed: 0,
//   2016-09-02T22:27:55.847599+00:00 app[web.1]:         valid: true } }

// module.exports = {
//   getEventTest: function() {
//     return knex('events').first();
//   },
//   recordWebhook: function(json_event){
//     console.log('record the webhook')
//   }
// }