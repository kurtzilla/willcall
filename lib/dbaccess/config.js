/* CONFIG.js
    description: database access methods for the config table
    notes:  each user will start with the base config and have their
            own individual settings applied on top of the base
 */
console.log('FILE HIT');
var knex = require('../../db/knex');

module.exports = {

  // testing
  getShowTest: function() {
    return knex('shows').first();
  },

  // TODO ensure only one base config
  // seed it?

  // return a collection of configs that do not have a specific user assigned
  // these configs comprise the "baseConfig'
  getBaseConfigCollection: function(){
    return knex('configs').where({user_id:null});
  },
  getUserConfigCollection: function(user_id){
    return knex('configs').where({user_id:user_id});
  },
  // TODO not sure if this is necessary
  // returns a particular setting - hopefully this will live ina service
  getEffectiveConfigByKey: function(user_id){
    //search for base key row
    // if override-able, see if we have a key for the user and return that row
  },

  createBaseConfigKey: function(context, description, key, value, datatype, active, allowoverride){

  },
  createUserConfigKey: function(key, value, active){

  },
  updateBaseConfigKey: function(context, description, key, value, datatype, active, allowoverride){
    // TODO update updated_at
  },
  updateUserConfigKey: function(user_id, key, value, active) {
    // TODO update updated_at
    // if we figure out that we are setting to base value - then delete row
    // find base key or existing user key and update
    // if not found then create by inheriting values from base and applying overriding value
  },
  deleteConfigKey: function(id){
    // if it is a user's key - delete the row
    // if it is a base key - delete all user rows with the same key
  }
    // getUserPlayer_ByUserId: function(_id){
    // if(!_id || _id === 0)
    //   return {rows:[]};
    //
    // var sql =
    //   'SELECT u.*, ' +
    //   'pl.id AS "player_id", pl.gameid, pl.lastlocation, ' +
    //   'ap.id AS "activeplayer_id




};