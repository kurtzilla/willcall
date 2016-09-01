/* MEMBERS.js
 description: database access methods for the members table
 SCHEMA:

 table.increments();
 table.timestamps(true,true);

 table.string('stripeuserid').unique().notNullable();
 table.string('stripepublishkey').notNullable();
 table.string('stripeaccesstoken').nullable();
 table.string('striperefreshtoken').nullable();
 table.boolean('wctapproved').defaultsTo('false');

 table.string('businesslogo', 512).nullable();
 table.string('businessname', 512).unique().notNullable().defaultsTo('');
 table.string('businessurl', 512).notNullable().defaultsTo('');
 table.boolean('chargesenabled').defaultsTo('false');
 table.string('country').notNullable().defaultsTo('');
 table.string('defaultcurrency').notNullable().defaultsTo('');
 table.boolean('detailssubmitted').defaultsTo('false');
 table.string('displayname', 512).notNullable().defaultsTo('');
 table.string('email', 512).notNullable().defaultsTo('');
 table.boolean('managed').defaultsTo('false');
 table.string('statementdescriptor').notNullable().defaultsTo('');
 table.string('supportemail', 512).nullable();
 table.string('supportphone').notNullable().defaultsTo('');
 table.string('timezone').notNullable().defaultsTo('');
 table.boolean('transfersenabled').defaultsTo('false');
 table.json('images').notNullable().defaultsTo(JSON.stringify([]))
 .comment('name, context, short description and a url');
 */


var knex = require('../../config/db/knex');

///////////////////////////////////////////////////////////////////
// CREATE METHODS
///////////////////////////////////////////////////////////////////
exports.createMemberStripe = function (
  stripeuserid, stripepublishkey, stripeaccesstoken, striperefreshtoken) {

  // console.log('*** createMemberStripe');
  return knex('members').insert({
    stripeuserid: stripeuserid,
    stripepublishkey: stripepublishkey,
    stripeaccesstoken: stripeaccesstoken,
    striperefreshtoken: striperefreshtoken
  })
  .then(function(ins){
    return exports.getMember_ByStripeUserId(stripeuserid);
  });
};

///////////////////////////////////////////////////////////////////
// READ METHODS
///////////////////////////////////////////////////////////////////
exports.getMember_ByStripeUserId = function(stripeuserid){
  return knex('members').where({stripeuserid: stripeuserid}).first();
};

exports.getMembers = function(){
  return knex('members');
};

exports.getMember_ById = function(id){
  return knex('members').where({id: id}).first();
};

///////////////////////////////////////////////////////////////////
// UPDATE METHODS
///////////////////////////////////////////////////////////////////
exports.updateMemberApproval_ByStripeUserId = function(stripeuserid, isApproved){

  return knex('members').update({
    wctapproved: isApproved,
    updated_at: knex.fn.now()
  }).where({stripeuserid:stripeuserid})
  .then(function(){
    return exports.getMember_ByStripeUserId(stripeuserid);
  });
};

exports.updateMemberStripe_ByStripeUserId = function (
  stripeuserid, stripepublishkey, stripeaccesstoken, striperefreshtoken) {

  return knex('members').update({
    stripepublishkey: stripepublishkey,
    stripeaccesstoken: stripeaccesstoken,
    striperefreshtoken: striperefreshtoken,
    updated_at: knex.fn.now()
  }).where({stripeuserid: stripeuserid}).then(function(_id){
    return exports.getMember_ByStripeUserId(stripeuserid);
  });
};

exports.updateMemberAccountInfo_ByStripeAccount = function(_account){

  return knex('members').update({
    businesslogo: _account.business_logo,
    businessname: _account.business_name,
    businessurl: _account.business_url,
    chargesenabled: _account.charges_enabled,
    country: _account.country,
    defaultcurrency: _account.default_currency,
    detailssubmitted: _account.details_submitted,
    displayname: _account.display_name,
    email: _account.email,
    managed: _account.managed,
    statementdescriptor: _account.statement_descriptor,
    supportemail: _account.support_email,
    supportphone: _account.support_phone,
    timezone: _account.timezone,
    transfersenabled: _account.transfers_enabled

  }).where({stripeuserid: _account.id}).then(function(){
    return exports.getMember_ByStripeUserId(_account.id);
  });
};


///////////////////////////////////////////////////////////////////
// DELETE METHODS
///////////////////////////////////////////////////////////////////
exports.deleteMember_ByStripeUserId = function(stripeuserid){
  return knex('members').where({stripeuserid:stripeuserid}).del();
};